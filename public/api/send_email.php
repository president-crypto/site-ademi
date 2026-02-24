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

    $headers = "From: webmaster@associationademi.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi de l\'email.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
?>
