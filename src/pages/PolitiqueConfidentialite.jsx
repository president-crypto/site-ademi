import React from 'react';
import { ShieldCheck, Database, Clock, Lock, Mail, Search, X } from 'lucide-react';

const PolitiqueConfidentialite = () => {
    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <section className="bg-primary text-white py-20 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ShieldCheck size={48} className="text-secondary mb-6 mx-auto" />
                    <h1 className="text-4xl md:text-5xl font-black font-heading mb-4">Politique de Confidentialité</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Comment nous protégeons vos données personnelles.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-14 space-y-10">
                    <div className="flex items-start gap-4">
                        <Database size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Données collectées</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Nous collectons uniquement les données que vous nous fournissez volontairement via notre formulaire de contact : nom et adresse email.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Search size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Finalité du traitement</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Les données collectées sont utilisées uniquement pour répondre à vos demandes et vous fournir les informations que vous sollicitez.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Clock size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Durée de conservation</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis supprimées.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Lock size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Vos droits</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à&nbsp;
                                <a href="mailto:contact@associationademi.com" className="text-secondary hover:underline">contact@associationademi.com</a>.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <X size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Partage des données</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Nous ne transférons aucune donnée à des tiers. Vos informations restent strictement confidentielles.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Search size={24} className="text-primary mt-1 shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Google Search Console</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Nous utilisons Google Search Console pour analyser les statistiques de visite de notre site. Aucun cookie publicitaire n'est utilisé.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PolitiqueConfidentialite;
