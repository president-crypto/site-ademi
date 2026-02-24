import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-12 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo-ademi.png" alt="Association ADEMI" className="h-10 w-auto" />
                            <h3 className="text-xl font-bold font-heading">Association ADEMI</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Les créateurs d'aujourd'hui. Les dirigeants de demain.
                            Nous œuvrons pour l'excellence et l'innovation.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold font-heading mb-4">Liens Rapides</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="/association" className="hover:text-secondary transition-colors">Notre Association</a></li>
                            <li><a href="/galerie" className="hover:text-secondary transition-colors font-bold text-accent">Médiathèque</a></li>
                            <li><a href="/projets" className="hover:text-secondary transition-colors">Nos Projets</a></li>
                            <li><a href="/formations" className="hover:text-secondary transition-colors">Formations</a></li>
                            <li><a href="/contact" className="hover:text-secondary transition-colors font-bold text-secondary">Soutenir l'Impact</a></li>
                            <li><a href="/contact" className="hover:text-secondary transition-colors">Contactez-nous</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="text-lg font-bold font-heading mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-center space-x-2">
                                <Mail size={16} className="text-secondary" />
                                <span>contact@associationademi.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone size={16} className="text-secondary" />
                                <span>+33 7 82 66 83 74</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin size={16} className="text-secondary" />
                                <span>30 Rue Henri Dunant, 86000 Poitiers</span>
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-6">
                            <a href="https://www.facebook.com/AssociationADEMI/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/associationademi/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.youtube.com/channel/UCkZAV__TRJ7jndx7jGV6mcw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-600 transition-colors" aria-label="YouTube">
                                <Youtube size={20} />
                            </a>
                            <a href="https://www.tiktok.com/@associationademi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors" aria-label="TikTok">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Association ADEMI. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
