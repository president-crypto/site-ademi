import React, { useState } from 'react';
import { Heart, Send, CheckCircle, Loader2, HandHeart, Users, Handshake, Package } from 'lucide-react';

const Soutenir = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'Soutien',
                    ...formData
                })
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setIsSuccess(false), 5000);
            } else {
                alert("Erreur lors de l'envoi. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <Heart size={48} className="text-secondary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight text-white">Soutenez ADEMI et changez des vies</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed opacity-90">
                        Chaque jour, des jeunes et des adultes ayant moins d'opportunités (JAMO et VAMO) font face à des obstacles pour s'insérer professionnellement, créer leur entreprise ou accéder à la mobilité internationale. ADEMI est là pour les accompagner — mais nous avons besoin de vous.
                    </p>
                </div>
            </section>

            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-black font-heading text-primary mb-6">Pourquoi soutenir ADEMI ?</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Votre soutien permet de financer des formations, des projets d'entrepreneuriat, des échanges internationaux via Erasmus+ et des actions de terrain au service de la jeunesse.
                        </p>
                    </div>

                    <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-black font-heading text-primary mb-10">Comment nous soutenir ?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100/50 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5">
                                    <Heart size={28} />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-primary mb-2">Don financier</h3>
                                <p className="text-gray-600">Toute contribution compte, petite ou grande.</p>
                            </div>

                            <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100/50 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-5">
                                    <HandHeart size={28} />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-primary mb-2">Bénévolat</h3>
                                <p className="text-gray-600">Offrez votre temps et vos compétences.</p>
                            </div>

                            <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100/50 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-5">
                                    <Handshake size={28} />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-primary mb-2">Partenariat</h3>
                                <p className="text-gray-600">Rejoignez notre réseau d'entreprises et institutions partenaires.</p>
                            </div>

                            <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100/50 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 mb-5">
                                    <Package size={28} />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-primary mb-2">Soutien matériel</h3>
                                <p className="text-gray-600">Équipements, locaux, ressources.</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center bg-primary/5 p-10 rounded-[3rem] border border-primary/10">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Pour nous soutenir, contactez-nous via le formulaire ci-dessous ou écrivez-nous directement à{' '}
                            <a href="mailto:contact@associationademi.com" className="text-secondary font-bold hover:underline">contact@associationademi.com</a>
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                        {isSuccess && (
                            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={40} className="text-accent" />
                                </div>
                                <h2 className="text-3xl font-black font-heading text-primary mb-3">Message envoyé !</h2>
                                <p className="text-gray-600 font-medium max-w-sm">
                                    Merci pour votre message. Notre équipe reviendra vers vous dans les plus brefs délais.
                                </p>
                            </div>
                        )}

                        <h2 className="text-3xl font-black font-heading text-primary mb-10">Envoyez-nous un message</h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-xs font-black text-primary uppercase tracking-[0.2em] ml-1">Nom complet</label>
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                        placeholder="Jean Dupont"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-xs font-black text-primary uppercase tracking-[0.2em] ml-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                        placeholder="jean@exemple.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="subject" className="text-xs font-black text-primary uppercase tracking-[0.2em] ml-1">Sujet</label>
                                <input
                                    required
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium"
                                    placeholder="Renseignement sur les formations"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-xs font-black text-primary uppercase tracking-[0.2em] ml-1">Message</label>
                                <textarea
                                    required
                                    id="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium resize-none"
                                    placeholder="Dites-nous tout..."
                                ></textarea>
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Soutenir;
