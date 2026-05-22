import React from 'react';
import { Scale, Building2, Globe, Shield, Mail, MapPin } from 'lucide-react';

const MentionsLegales = () => {
    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <section className="bg-primary text-white py-20 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Scale size={48} className="text-secondary mb-6 mx-auto" />
                    <h1 className="text-4xl md:text-5xl font-black font-heading mb-4">Mentions Légales</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Informations légales relatives à l'association ADEMI.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-14 space-y-10">
                    <div className="flex items-start gap-4">
                        <Building2 size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Éditeur</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Association ADEMI — Appui au Développement Économique et à la Mobilité Internationale
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <MapPin size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Adresse</h2>
                            <p className="text-gray-600 leading-relaxed">
                                30 Rue Henri Dunant, 86000 Poitiers, France
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Shield size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">SIRET</h2>
                            <p className="text-gray-600 leading-relaxed">820 595 635 00013</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Building2 size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Responsable de publication</h2>
                            <p className="text-gray-600 leading-relaxed">Mina HASSANI</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Mail size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Contact</h2>
                            <p className="text-gray-600 leading-relaxed">
                                <a href="mailto:contact@associationademi.com" className="text-secondary hover:underline">contact@associationademi.com</a>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Globe size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Hébergeur</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Hostinger International Ltd<br />
                                61 Lordou Vironos Street, 6023 Larnaca, Chypre
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MentionsLegales;
