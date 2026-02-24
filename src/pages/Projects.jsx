import React, { useState } from 'react';
import { ArrowUpRight, X, Calendar, Target, Users } from 'lucide-react';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 'sama-radio',
            title: 'Sama Radio',
            category: 'Inclusion & Communication',
            description: 'Un pont culturel pour favoriser l\'intégration sociale et préserver le patrimoine linguistique des communautés immigrées.',
            fullDescription: 'Sama Radio est la voix de notre communauté. Ce projet vise à offrir un espace d\'expression aux personnes issues de l\'immigration, permettant de préserver leurs cultures d\'origine tout en facilitant leur intégration dans la société française. Nous diffusons des programmes variés allant de l\'actualité locale à la musique traditionnelle, en passant par des débats de société.',
            image: '/Photos/maire_folder/20260121_143839.jpg',
            impact: 'Plus de 2000 auditeurs réguliers et 50 bénévoles formés aux techniques radio.',
            objectifs: ['Favoriser l\'expression citoyenne', 'Lutter contre l\'isolement', 'Valoriser la diversité culturelle'],
        },
        {
            id: 'cite-educative',
            title: 'Cité Éducative',
            category: 'Action Territoriale',
            description: 'Programme en partenariat avec KURIOZ et la Mairie de Poitiers pour valoriser la jeunesse du quartier des Couronneries.',
            fullDescription: 'En collaboration avec les acteurs locaux, nous intervenons dans le quartier des Couronneries pour offrir aux jeunes des opportunités d\'apprentissage innovantes. À travers des ateliers de médias, de citoyenneté et de technologie, nous aidons les jeunes à devenir des acteurs engagés de leur territoire. Le projet Cité Éducative est un levier majeur pour l\'égalité des chances.',
            image: '/Photos/cite_folder/P1110062.JPG',
            impact: 'Accompagnement de 150 jeunes par an dans des parcours pédagogiques.',
            objectifs: ['Renforcer le lien école-famille', 'Développer l\'esprit critique', 'Favoriser l\'accès aux outils numériques'],
        },
        {
            id: 'jamo',
            title: 'Accompagnement JAMO',
            category: 'Entreprenariat',
            description: 'Le Dispositif d\'Accompagnement Personnalisé (DAP) pour les jeunes ayant moins d\'opportunités dans leur projet de création.',
            fullDescription: 'Le programme JAMO (Jeunes Ayant Moins d\'Opportunités) est un dispositif phare d\'ADEMI. Nous offrons un coaching personnalisé à des jeunes porteurs de projets économiques qui font face à des barrières sociales ou financières. De l\'idée au business plan, nous les guidons vers le succès pour qu\'ils deviennent les entrepreneurs de demain.',
            image: '/Photos/senegal_folder/WhatsApp Image 2025-12-29 at 21.20.10.jpeg',
            impact: '30 entreprises créées par des jeunes du quartier ces deux dernières années.',
            objectifs: ['Soutien au montage de projet', 'Mise en réseau professionnelle', 'Aide à la recherche de financements'],
        },
        {
            id: 'erasmus',
            title: 'Mobilité Erasmus+',
            category: 'International',
            description: 'Expériences culturelles et professionnelles à l\'étranger pour élargir les horizons des jeunes au-delà de leur environnement local.',
            fullDescription: 'La mobilité ne doit pas être un luxe mais un levier de réussite. ADEMI organise des échanges européens pour permettre aux jeunes de Poitiers de découvrir de nouveaux horizons, de pratiquer des langues étrangères et d\'acquérir une autonomie précieuse. Ces immersions culturelles et professionnelles sont de véritables tremplins pour leur avenir.',
            image: '/Photos/senegal_folder/WhatsApp Image 2025-12-29 at 21.20.05.jpeg',
            impact: 'Plus de 100 jeunes ont déjà bénéficié de la mobilité partout en Europe, renforçant leur confiance et leur ouverture sur le monde.',
            objectifs: ['Découverte interculturelle', 'Apprentissage des langues', 'Développement de l\'autonomie'],
        },
    ];

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            {/* Header */}
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight">Nos Projets</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed opacity-90">
                        Des initiatives concrètes pour un impact durable sur notre communauté et la jeunesse.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-10">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all"></div>
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-primary uppercase tracking-widest shadow-lg">
                                    {project.category}
                                </div>
                            </div>
                            <div className="p-10 flex flex-col flex-1">
                                <h3 className="text-3xl font-black font-heading text-gray-900 mb-4 group-hover:text-secondary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg flex-1">
                                    {project.description}
                                </p>
                                <button className="flex items-center text-primary font-black hover:text-secondary transition-colors group/btn">
                                    En savoir plus
                                    <ArrowUpRight size={20} className="ml-2 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal Detail */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in"
                    onClick={() => setSelectedProject(null)}
                >
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="fixed top-8 right-8 z-[210] p-4 bg-white/10 text-white rounded-full hover:bg-secondary transition-all shadow-2xl border border-white/20 group hover:scale-110"
                    >
                        <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div
                        className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative animate-scale-in max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Side */}
                        <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-1/2 p-8 md:p-12 overflow-y-auto">
                            <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-xs font-black rounded-full uppercase tracking-widest mb-6 border border-secondary/20">
                                {selectedProject.category}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-6 leading-tight">
                                {selectedProject.title}
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-10">
                                {selectedProject.fullDescription}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-primary">
                                        <Target size={24} className="text-secondary" />
                                        <h4 className="font-black uppercase tracking-wider text-sm">Objectifs</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {selectedProject.objectifs.map((obj, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                                                {obj}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-3 text-primary">
                                        <Users size={24} className="text-secondary" />
                                        <h4 className="font-black uppercase tracking-wider text-sm">Impact</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                        {selectedProject.impact}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedProject(null)}
                                className="w-full py-5 bg-primary text-white rounded-2xl font-black hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
                            >
                                Fermer les détails
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
