import React from 'react';
import { Handshake, ExternalLink, Building2, GraduationCap, Laptop, Users } from 'lucide-react';

const Partenaires = () => {
    const partnerCategories = [
        {
            title: "Partenaires Institutionnels",
            icon: <Building2 className="w-6 h-6" />,
            partners: [
                { name: 'Mairie de Poitiers', type: 'Public', logo: '/logos/mairie-poitiers.png' },
                { name: 'France Travail', type: 'Public', logo: '/logos/france-travail.png' },
                { name: 'Mission Locale', type: 'Insertion', logo: '/logos/mission-locale.png' },
                { name: 'CCAS de Poitiers', type: 'Social', logo: '/logos/ccas-poitiers.png' },
                { name: 'CRESS Nouvelle-Aquitaine', type: 'ESS', logo: '/logos/cress-na.png' },
                { name: 'Union Européenne', type: 'Erasmus+', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/320px-Flag_of_Europe.svg.png' },
            ]
        },
        {
            title: "Éducation & Recherche",
            icon: <GraduationCap className="w-6 h-6" />,
            partners: [
                { name: 'Université de Poitiers', type: 'Académique', logo: '/logos/univ-poitiers.png' },
                { name: 'IAE de Poitiers', type: 'Management', logo: '/logos/iae-poitiers.jpeg' },
                { name: 'Lycée Aliénor d\'Aquitaine', type: 'Éducation', logo: null },
                { name: 'Lycée Le Dolmen', type: 'Éducation', logo: '/logos/lycee-le-dolmen.jpeg' },
                { name: 'Université de Limoges', type: 'Académique', logo: '/logos/univ-limoges.png' },
            ]
        },
        {
            title: "Soutiens Technologiques",
            icon: <Laptop className="w-6 h-6" />,
            partners: [
                { name: 'Google NonProfits', type: 'Tech', logo: '/logos/google-nonprofits.jpeg' },
                { name: 'Microsoft NonProfits', type: 'Tech', logo: '/logos/microsoft-nonprofits.jpeg' },
            ]
        },
        {
            title: "Vie Associative & Culturelle",
            icon: <Users className="w-6 h-6" />,
            partners: [
                { name: 'Association KURIOZ', type: 'ONG', logo: '/logos/kurioz.jpeg' },
                { name: 'Info Jeunes', type: 'Jeunesse', logo: '/logos/info-jeunes.jpeg' },
                { name: 'La M3Q', type: 'Local', logo: 'https://logo.clearbit.com/m3q.asso.fr' },
                { name: 'Barabgaï#K2', type: 'Collectif', logo: null },
                { name: 'Futuroscope', type: 'Loisirs', logo: '/logos/futuroscope.png' },
                { name: 'Auto-Ecole Couronneries', type: 'Service', logo: '/logos/auto-ecole-couronneries.jpeg' },
            ]
        }
    ];

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight text-white">Nos Partenaires</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed opacity-90">
                        Ils nous soutiennent et partagent notre vision d'un avenir meilleur pour tous.
                    </p>
                </div>
            </section>

            {/* Partners Grid by Categories */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
                {partnerCategories.map((category, catIndex) => (
                    <div key={catIndex} className="animate-fade-in">
                        <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-4">
                            <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                                {category.icon}
                            </div>
                            <h2 className="text-3xl font-black font-heading text-primary">{category.title}</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {category.partners.map((partner, pIndex) => (
                                <div
                                    key={pIndex}
                                    className="group flex flex-col items-center justify-between p-6 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[180px]"
                                >
                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center overflow-hidden p-3 group-hover:bg-white transition-all relative">
                                        {partner.logo ? (
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="max-w-full max-h-full object-contain transition-all duration-500 relative z-10"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className={`absolute inset-0 items-center justify-center ${partner.logo ? 'hidden' : 'flex'}`}>
                                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary font-black text-2xl uppercase">
                                                {partner.name[0]}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-black text-gray-900 text-sm leading-tight group-hover:text-primary transition-colors">
                                            {partner.name}
                                        </h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2 block">
                                            {partner.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-[3rem] p-10 md:p-20 text-center border border-gray-100 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
                    <div className="w-24 h-24 bg-secondary/10 text-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform duration-500">
                        <Handshake size={48} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-8 tracking-tight">Construisons l'avenir ensemble</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Vous souhaitez soutenir nos actions et avoir un impact positif sur la jeunesse ?
                        Rejoignez notre réseau de partenaires dès aujourd'hui.
                    </p>
                    <a href="/contact" className="inline-flex items-center px-12 py-5 bg-primary text-white rounded-[2rem] font-black text-lg hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:-translate-y-1">
                        Devenir Partenaire <ExternalLink size={24} className="ml-3" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Partenaires;
