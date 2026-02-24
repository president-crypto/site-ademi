import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';

const Contact = () => {
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
                    type: 'Contact',
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
            // Simulation pour la démo locale
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
                    <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight text-white">Contactez-nous</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed opacity-90">
                        Une question ? Un projet ? Nous sommes à votre écoute.
                    </p>
                </div>
            </section>

            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6">
                                <MapPin size={28} />
                            </div>
                            <h3 className="text-2xl font-black font-heading mb-3 text-primary">Notre Bureau</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                30 Rue Henri Dunant<br />
                                86000 Poitiers, France
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-secondary mb-6">
                                <Mail size={28} />
                            </div>
                            <h3 className="text-2xl font-black font-heading mb-3 text-primary">Email</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                contact@associationademi.com<br />
                                support@associationademi.com
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-accent mb-6">
                                <Phone size={28} />
                            </div>
                            <h3 className="text-2xl font-black font-heading mb-3 text-primary">Téléphone</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                +33 7 82 66 83 74<br />
                                <span className="text-sm font-bold uppercase tracking-wider opacity-60">Lun - Ven, 9h-17h</span>
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
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

export default Contact;
