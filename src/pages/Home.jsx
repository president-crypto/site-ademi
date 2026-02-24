import React from 'react';
import { ArrowRight, Users, Lightbulb, GraduationCap, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const news = [
    {
        id: 1,
        platform: 'TikTok',
        date: '10 Fév 2026',
        image: '/Photos/orks_folder/20260210_103902[1].jpg',
        text: 'Préparation intense pour le tournoi d\'e-sport interquartier avec l\'association ORKS ! 🎮🔥 #Gaming #JeunessePoitiers #TikTok',
        link: 'https://www.tiktok.com/@associationademi'
    },
    {
        id: 2,
        platform: 'Instagram',
        date: '21 Jan 2026',
        image: '/Photos/maire_folder/20260121_143839.jpg',
        text: 'Quel honneur de recevoir Madame la Maire Léonore Moncond\'huy dans nos studios de Sama Radio. Des échanges inspirants sur l\'avenir de notre jeunesse. 📻✨',
        link: 'https://www.instagram.com/associationademi/'
    },
    {
        id: 3,
        platform: 'YouTube',
        date: '29 Déc 2025',
        image: '/Photos/senegal_folder/WhatsApp Image 2025-12-29 at 21.20.09.jpeg',
        text: 'DÉCOUVREZ : Notre action de soutien au développement de la jeunesse au Sénégal. Une aventure humaine incroyable à retrouver en vidéo. 🇸🇳🌍',
        link: 'https://www.youtube.com/channel/UCkZAV__TRJ7jndx7jGV6mcw'
    },
    {
        id: 4,
        platform: 'Facebook',
        date: '15 Jan 2026',
        image: '/Photos/cite_folder/P1110108.JPG',
        text: 'Immersion au cœur de la Cité Éducative aux Couronneries. Accompagner chaque jeune vers la réussite est notre priorité au quotidien. 🤝📈',
        link: 'https://www.facebook.com/AssociationADEMI/'
    }
];

const Home = () => {
    return (
        <div className="flex flex-col gap-24 pb-24">
            {/* Hero Section with Video */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-white/10 z-10" />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                        poster="/Photos/poster_home.jpg"
                    >
                        <source src="/videos/accueil_bg.mp4" type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center text-white">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-semibold tracking-wider uppercase animate-fade-in">
                        Association ADEMI
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-heading mb-8 leading-tight animate-fade-in-up">
                        <span className="block text-xl md:text-3xl font-bold text-gray-200 mb-2 opacity-80 uppercase tracking-[0.2em]">Appui au</span>
                        Développement Économique <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">et à la Mobilité Internationale</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                        Plus de <span className="text-secondary font-bold">500 jeunes</span> déjà accompagnés vers l'autonomie, l'innovation et la création d'entreprise.
                    </p>
                    <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards] italic">
                        "Les créateurs d'aujourd'hui, les dirigeants de demain."
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                        <Link
                            to="/association"
                            className="px-10 py-4 bg-secondary text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-secondary/20 hover:-translate-y-1 active:scale-95"
                        >
                            Notre Mission <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/contact"
                            className="px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95"
                        >
                            Nous Rejoindre
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                </div>
            </section>

            {/* Mission / Values Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-32">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="group p-10 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-50 hover:border-secondary/20 transition-all duration-500">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                            <Users size={36} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-heading text-gray-900 group-hover:text-primary transition-colors">Solidarité</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Une inclusion sociale réelle pour reconnaître les talents ignorés, quelles que soient leurs origines.
                        </p>
                    </div>

                    <div className="group p-10 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-50 hover:border-secondary/20 transition-all duration-500 md:translate-y-8">
                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                            <Lightbulb size={36} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-heading text-gray-900 group-hover:text-secondary transition-colors">Innovation</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            La jeunesse comme moteur de changement, porteuse de solutions créatives pour un avenir meilleur.
                        </p>
                    </div>

                    <div className="group p-10 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-50 hover:border-secondary/20 transition-all duration-500">
                        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                            <GraduationCap size={36} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-heading text-gray-900 group-hover:text-accent transition-colors">Égalité</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Donner à chaque jeune les moyens de développer son autonomie et son excellence entrepreneuriale.
                        </p>
                    </div>
                </div>
            </section>
            {/* Actualités Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm">Suivez-nous</span>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mt-2">Actualités Récentes</h2>
                    </div>
                    <p className="text-gray-500 max-w-md">
                        Restez connectés avec nos dernières actions et événements en direct de nos réseaux sociaux.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {news.map((item) => (
                        <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt="News thumbnail"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-primary shadow-lg">
                                    {item.platform}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center text-gray-400 text-sm mb-4">
                                    <Calendar size={16} className="mr-2" />
                                    {item.date}
                                </div>
                                <p className="text-gray-800 font-bold text-lg mb-6 line-clamp-3 leading-snug group-hover:text-primary transition-colors">
                                    {item.text}
                                </p>
                                <div className="mt-auto">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-primary font-black hover:text-secondary transition-colors text-sm group/link"
                                    >
                                        Voir sur {item.platform}
                                        <ExternalLink size={16} className="ml-2 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Donation / Impact Section */}
            <section className="bg-primary relative py-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 translate-x-1/2" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 text-white">
                            <span className="text-secondary font-black tracking-[0.3em] uppercase text-sm mb-4 block">Investir dans l'Avenir</span>
                            <h2 className="text-4xl md:text-6xl font-black font-heading mb-8 leading-tight">
                                Soutenez l'Impact <br />
                                <span className="text-secondary">de l'Association ADEMI</span>
                            </h2>
                            <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-xl">
                                Vos dons permettent de financer les projets d'insertion des **JAMO** et **VAMO**, d'entretenir nos outils pédagogiques et de favoriser la mobilité internationale. Chaque contribution est un pas de plus vers une société plus inclusive.
                            </p>
                            <Link
                                to="/contact"
                                className="group inline-flex items-center gap-4 bg-white text-primary px-10 py-5 rounded-2xl font-black hover:bg-secondary hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/20"
                            >
                                Faire un don / Nous soutenir
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-6 w-full">
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-white">
                                <div className="text-4xl font-black text-secondary mb-2">100%</div>
                                <p className="text-sm font-bold text-blue-100">Transparence</p>
                                <p className="text-xs text-blue-200/60 mt-2 italic">Chaque euro est investi dans le terrain.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-white">
                                <div className="text-4xl font-black text-secondary mb-2">500+</div>
                                <p className="text-sm font-bold text-blue-100">Vies Impactées</p>
                                <p className="text-xs text-blue-200/60 mt-2 italic">Grâce à la solidarité de nos membres.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-white col-span-2">
                                <p className="text-center font-bold text-blue-100">"Soutenir ADEMI, c'est donner une voix à ceux qui n'en ont pas."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Citation Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-right scale-110" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <svg className="w-16 h-16 text-secondary/20 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.535003 13 -1.017 12.5523 -1.017 12V9C-1.017 7.34315 0.326142 6 2.017 6H8.017C9.67386 6 11.017 7.34315 11.017 9V15C11.017 18.3137 8.33071 21 5.017 21H3.017Z" />
                        </svg>
                        <p className="text-2xl md:text-3xl font-medium text-gray-700 italic leading-relaxed mb-8">
                            "L'éducation est l'arme la plus puissante qu'on puisse utiliser pour changer le monde."
                        </p>
                        <cite className="not-italic">
                            <span className="block font-black text-primary text-xl tracking-wide">— Nelson Mandela</span>
                        </cite>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
