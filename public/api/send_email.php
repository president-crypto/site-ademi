<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Données invalides.']);
        exit;
    }

    $to = 'contact@associationademi.com';
    $from = 'president@associationademi.com';
    $type = isset($data['type']) ? $data['type'] : 'Contact';
    $name = isset($data['name']) ? strip_tags($data['name']) : 'Anonyme';
    $email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($data['phone']) ? strip_tags($data['phone']) : 'Non précisé';
    $subjectLine = isset($data['subject']) ? strip_tags($data['subject']) : "Nouveau message ($type)";
    $message = isset($data['message']) ? strip_tags($data['message']) : '';
    $formation = isset($data['formation']) ? strip_tags($data['formation']) : '';

    $subject = "Site ADEMI : $subjectLine";

    $email_content = "Nouveau message du site ADEMI\n\n";
    $email_content .= "Type : $type\n";
    if ($formation) {
        $email_content .= "Formation : $formation\n";
    }
    $email_content .= "Nom : $name\n";
    $email_content .= "Email : $email\n";
    $email_content .= "Téléphone : $phone\n\n";
    $email_content .= "Message :\n$message\n";

    $smtp_host = 'smtp.gmail.com';
    $smtp_port = 465;
    $smtp_user = 'president@associationademi.com';
    $smtp_pass = '%%SMTP_PASSWORD%%';

    $raw_headers = "From: $from\r\n";
    $raw_headers .= "Reply-To: $email\r\n";
    $raw_headers .= "To: $to\r\n";
    $raw_headers .= "Subject: $subject\r\n";
    $raw_headers .= "MIME-Version: 1.0\r\n";
    $raw_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $raw_headers .= "X-Mailer: PHP/ADEMI-SMTP\r\n";
    $raw_headers .= "\r\n$email_content";

    $result = smtp_send($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $from, $to, $raw_headers);

    if ($result === true) {
        echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur SMTP : ' . $result]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}

function smtp_send($host, $port, $user, $pass, $from, $to, $raw_data) {
    $socket = @stream_socket_client("ssl://$host:$port", $errno, $errstr, 30);
    if (!$socket) {
        return "Connexion SSL impossible : $errstr ($errno)";
    }

    if (!smtp_read($socket, 220)) {
        return "Réponse d'accueil invalide";
    }

    smtp_command($socket, "EHLO associationademi.com");
    if (!smtp_read($socket, 250)) {
        return "EHLO refusé";
    }

    smtp_command($socket, "AUTH LOGIN");
    if (!smtp_read($socket, 334)) {
        return "AUTH LOGIN refusé";
    }

    smtp_command($socket, base64_encode($user));
    if (!smtp_read($socket, 334)) {
        return "Nom d'utilisateur refusé";
    }

    smtp_command($socket, base64_encode($pass));
    if (!smtp_read($socket, 235)) {
        return "Mot de passe refusé";
    }

    smtp_command($socket, "MAIL FROM:<$from>");
    if (!smtp_read($socket, 250)) {
        return "MAIL FROM refusé";
    }

    smtp_command($socket, "RCPT TO:<$to>");
    if (!smtp_read($socket, 250)) {
        return "RCPT TO refusé";
    }

    smtp_command($socket, "DATA");
    if (!smtp_read($socket, 354)) {
        return "DATA refusé";
    }

    smtp_command($socket, $raw_data . "\r\n.");
    if (!smtp_read($socket, 250)) {
        return "ENVOI DATA refusé";
    }

    smtp_command($socket, "QUIT");
    fclose($socket);

    return true;
}

function smtp_command($socket, $data) {
    fwrite($socket, $data . "\r\n");
}

function smtp_read($socket, $expected_code) {
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    $code = (int)substr($response, 0, 3);
    return $code === $expected_code;
}
