import React from 'react';
import { Users, Award, Target, Lightbulb, User } from 'lucide-react';

const Association = () => {
    const teamMembers = [
        { name: 'BADJI Baba', role: 'Président' },
        { name: 'DJIBA Doudou', role: 'Vice-Président' },
        { name: 'MADI SIDI Mouhidine', role: 'Chargé de Relations Internationales' },
        { name: 'HASSANI Mina', role: 'Chargée de la Communication' },
        { name: 'MEDERER Carine', role: 'Secrétaire Générale' },
        { name: 'CAMARA Ndèye Yacine', role: 'Chargée de Suivi de Projets' },
        { name: 'DIEDHIOU Bourama', role: 'Chargé Diaspora' },
        { name: 'KOTE Mohamed', role: 'Représentant à Paris' },
        { name: 'DIAGNE Seynabou', role: 'Auditrice & Trésorière' },
    ];

    return (
        <div className="pb-20">
            {/* ... (rest of the header and about section remains same) */}
            <section className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">L'Association ADEMI</h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Appui au Développement Économique et à la Mobilité Internationale — Au service de la jeunesse pour une insertion socio-professionnelle durable.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold font-heading text-primary mb-6">Qui sommes-nous ?</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            L'Association ADEMI (**Appui au Développement Économique et à la Mobilité Internationale**) est née d'une volonté commune de promouvoir l'excellence et le leadership au sein de la jeunesse.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Nous accompagnons spécifiquement les **JAMO** (Jeunes Ayant Moins d'Opportunités, 0-25 ans) et les **VAMO** (Vieux Ayant Moins d'Opportunités, plus de 25 ans) vers une insertion socio-professionnelle durable.
                        </p>
                        <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-secondary">
                            <h3 className="text-lg font-bold text-primary mb-2 italic">Notre Vision</h3>
                            <p className="text-gray-700 italic">
                                "ADEMI aspire à un monde où les individus et communautés prospèrent grâce à des opportunités économiques durables et la coopération internationale."
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-8 rounded-3xl text-center border border-blue-100/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="font-black text-primary uppercase tracking-wider mb-2">Solidarité</h3>
                            <p className="text-sm text-gray-600">Reconnaître les talents ignorés et favoriser l'inclusion réelle.</p>
                        </div>
                        <div className="bg-orange-50 p-8 rounded-3xl text-center border border-orange-100/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                            <Lightbulb className="w-12 h-12 text-secondary mx-auto mb-4" />
                            <h3 className="font-black text-secondary uppercase tracking-wider mb-2">Innovation</h3>
                            <p className="text-sm text-gray-600">La jeunesse comme moteur de changement et de solutions.</p>
                        </div>
                        <div className="bg-teal-50 p-8 rounded-3xl text-center border border-teal-100/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
                            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                            <h3 className="font-black text-accent uppercase tracking-wider mb-2">Égalité</h3>
                            <p className="text-sm text-gray-600">Donner à chacun les moyens de son excellence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-heading text-primary mb-4">Notre Équipe</h2>
                        <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-center p-8 border border-gray-100">
                                <div className="w-24 h-24 bg-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200">
                                    <User size={48} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-secondary font-medium text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Association;
