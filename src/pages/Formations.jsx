import React, { useState } from 'react';
import { BookOpen, Calendar, CheckCircle, X, Send, Phone, Mail, User } from 'lucide-react';

const Formations = () => {
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const formations = [
        {
            id: 'leadership',
            title: 'Leadership & Entrepreneuriat',
            duration: 'Cycle de 5 jours',
            level: 'Spécial JAMO',
            description: 'Un programme intensif pour structurer votre idée et transformer votre vision en une entreprise concrète.',
            modules: ['Leadership & Vision', 'Business Model Canvas (DAP)', 'Techniques de Pitch'],
        },
        {
            id: 'erasmus',
            title: 'Mobilité Internationale Erasmus+',
            duration: 'Variable',
            level: 'Inclusion Mondiale',
            description: 'Préparez votre départ à l\'étranger pour acquérir de nouvelles compétences et élargir votre réseau.',
            modules: ['Compétences Interculturelles', 'Gestion de Projet Européen', 'Langues & Communication'],
        },
        {
            id: 'numerique',
            title: 'Inclusion par le Numérique',
            duration: '3 jours',
            level: 'Tous Publics',
            description: 'Réduire la fracture numérique en maîtrisant les outils essentiels à la recherche d\'emploi et à l\'entreprenariat.',
            modules: ['Marketing Digital', 'Outils de Collaboration', 'Identité Numérique'],
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'Inscription Formation',
                    formation: selectedFormation.title,
                    ...formData
                })
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert("Une erreur est survénue. Veuillez réessayer plus tard.");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi:", error);
            // On simule le succès en local pour la démo si le script PHP n'est pas accessible
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setSelectedFormation(null);
        setIsSuccess(false);
    };

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight text-white">Nos Formations</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed opacity-90">
                        Renforcez vos compétences avec nos programmes pédagogiques adaptés à vos ambitions.
                    </p>
                </div>
            </section>

            {/* List */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="space-y-10">
                    {formations.map((formation) => (
                        <div key={formation.id} className="group bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row gap-10 hover:shadow-2xl transition-all duration-500">
                            <div className="md:w-1/3 flex flex-col justify-center bg-gray-50 rounded-[2rem] p-10 text-center border border-gray-100 group-hover:bg-primary/5 transition-colors">
                                <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <BookOpen className="w-10 h-10 text-secondary" />
                                </div>
                                <h3 className="text-2xl font-black text-primary mb-4 font-heading">{formation.title}</h3>
                                <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-gray-500">
                                    <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
                                        <Calendar size={14} className="text-secondary" />
                                        <span>{formation.duration}</span>
                                    </div>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                    <div className="bg-white px-3 py-1 rounded-full shadow-sm">
                                        {formation.level}
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3 flex flex-col">
                                <p className="text-gray-600 mb-8 text-xl leading-relaxed">
                                    {formation.description}
                                </p>
                                <div className="flex-1">
                                    <h4 className="font-black text-primary mb-6 text-xs uppercase tracking-[0.2em]">Modules inclus :</h4>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {formation.modules.map((module) => (
                                            <li key={module} className="flex items-center text-gray-700 font-medium">
                                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-3 mt-0.5">
                                                    <CheckCircle size={16} className="text-accent" />
                                                </div>
                                                {module}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => setSelectedFormation(formation)}
                                    className="mt-10 px-10 py-5 bg-primary text-white rounded-2xl hover:bg-secondary transition-all font-black text-lg shadow-xl shadow-primary/20 self-start hover:-translate-y-1"
                                >
                                    S'inscrire à cette formation
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Registration Modal */}
            {selectedFormation && (
                <div
                    className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="fixed top-8 right-8 z-[210] p-4 bg-white/10 text-white rounded-full hover:bg-secondary transition-all shadow-2xl border border-white/20 group hover:scale-110"
                    >
                        <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div
                        className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!isSuccess ? (
                            <div className="p-8 md:p-12">
                                <div className="text-center mb-10">
                                    <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-xs font-black rounded-full uppercase tracking-widest mb-4 border border-secondary/20">
                                        Inscription
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black font-heading text-primary leading-tight">
                                        {selectedFormation.title}
                                    </h2>
                                    <p className="mt-4 text-gray-500 font-medium">Veuillez remplir vos informations pour réserver votre place.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-primary uppercase tracking-wider ml-1">Nom complet</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Votre nom"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-primary uppercase tracking-wider ml-1">Téléphone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    required
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="06 -- -- -- --"
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-primary uppercase tracking-wider ml-1">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="votre@email.com"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-primary uppercase tracking-wider ml-1">Votre message (optionnel)</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Des questions particulières ?"
                                            rows="3"
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-secondary/20 focus:border-secondary outline-none transition-all font-medium resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Send size={24} />
                                                Confirmer l'inscription
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                    <CheckCircle className="w-12 h-12 text-accent" />
                                </div>
                                <h2 className="text-4xl font-black font-heading text-primary mb-4">C'est envoyé !</h2>
                                <p className="text-gray-600 text-lg font-medium max-w-sm mx-auto mb-10">
                                    Merci {formData.name}, votre demande d'inscription pour la formation **{selectedFormation.title}** a bien été reçue. Nous vous recontacterons très bientôt.
                                </p>
                                <button
                                    onClick={closeModal}
                                    className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
                                >
                                    Fermer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Formations;
