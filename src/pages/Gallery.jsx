import React, { useState } from 'react';
import { Camera, Film, Play, X } from 'lucide-react';

const Gallery = () => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [filter, setFilter] = useState('all');

    const mediaItems = [
        // Vidéos
        {
            id: 'v1',
            type: 'video',
            category: 'video',
            title: 'Soutien Jeunesse Sénégalaise',
            description: 'Action de solidarité et d\'appui au développement pour les jeunes au Sénégal.',
            src: '/videos/soutien_senegal.mp4',
            thumbnail: '/Photos/senegal_folder/WhatsApp Image 2025-12-29 at 21.20.09.jpeg'
        },
        {
            id: 'v2',
            type: 'video',
            category: 'video',
            title: 'Cité Éducative Poitiers',
            description: 'Immersion au cœur du programme Cité Éducative aux Couronneries.',
            src: '/videos/cite_folder/P1110031.MP4',
            thumbnail: '/Photos/cite_folder/P1110108.JPG'
        },
        {
            id: 'v3',
            type: 'video',
            category: 'video',
            title: 'Émission Radio : Madame la Maire à ADEMI',
            description: 'Visite de Madame Léonore Moncond\'huy dans nos studios de Sama Radio.',
            src: '/videos/visite_maire.mp4',
            thumbnail: '/Photos/maire_folder/20260121_143839.jpg'
        },
        {
            id: 'v4',
            type: 'video',
            category: 'video',
            title: 'Prépa tournoi interquartier jeux vidéo',
            description: 'Compétition de e-sport organisée en partenariat avec l\'association ORKS.',
            src: '/videos/tournoi_orks.mp4',
            thumbnail: '/Photos/orks_folder/20260210_103902[1].jpg'
        },
        {
            id: 'v5',
            type: 'video',
            category: 'video',
            title: 'Émission radio : Révélations avec Samantha',
            description: 'Sama Radio - Émission spéciale avec Samantha pour le projet REVELATIONS.',
            src: '/videos/Video emission radio REVELATIONS  avec Samantha/20250725_181926.mp4'
        },
        {
            id: 'v6',
            type: 'video',
            category: 'video',
            title: 'Rapport de stage - Hidaya',
            description: 'Présentation du rapport de fin de stage de Hidaya à l\'ADEMI.',
            src: '/videos/stage_hidaya/20251031_154332.mp4'
        },
        {
            id: 'v7',
            type: 'video',
            category: 'video',
            title: 'Rapport de stage - Wendy',
            description: 'Présentation du rapport de fin de stage de Wendy à l\'ADEMI.',
            src: '/videos/stage_wendy/20260213_153701.mp4'
        },
        // Photos - Cité Éducative
        {
            id: 'p1',
            type: 'image',
            category: 'cite',
            title: 'Cité Éducative - Atelier',
            src: '/Photos/cite_folder/P1110033.JPG',
        },
        {
            id: 'p2',
            type: 'image',
            category: 'cite',
            title: 'Cité Éducative - Échanges',
            src: '/Photos/cite_folder/P1110113.JPG',
        },
        // Photos - Visite Maire & Radio
        {
            id: 'p3',
            type: 'image',
            category: 'maire',
            title: 'Visite officielle - Échanges',
            src: '/Photos/maire_folder/20260121_143856.jpg',
        },
        {
            id: 'p4',
            type: 'image',
            category: 'radio',
            title: 'Émission Radio à Sama Radio de ADEMI',
            src: '/Photos/maire_folder/WhatsApp Image 2026-01-28 at 18.50.17.jpeg',
        },
        // Photos - Sénégal
        {
            id: 'p5',
            type: 'image',
            category: 'senegal',
            title: 'Action Jeunesse Sénégal',
            src: '/Photos/senegal_folder/WhatsApp Image 2025-12-29 at 21.20.10.jpeg',
        },
    ];

    const filteredMedia = filter === 'all'
        ? mediaItems
        : mediaItems.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <section className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black font-heading mb-4">Médiathèque ADEMI</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Découvrez nos archives photos et vidéos.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {[
                        { id: 'all', label: 'Tout voir', icon: <Camera size={18} /> },
                        { id: 'video', label: 'Vidéos', icon: <Film size={18} /> },
                        { id: 'cite', label: 'Cité Éducative', icon: <Camera size={18} /> },
                        { id: 'maire', label: 'Visite Officielle', icon: <Camera size={18} /> },
                        { id: 'senegal', label: 'Actions Sénégal', icon: <Camera size={18} /> },
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id)}
                            className={`px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 ${filter === btn.id
                                ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {btn.icon} {btn.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMedia.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
                            onClick={() => setSelectedMedia(item)}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                {item.type === 'image' ? (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : item.thumbnail ? (
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <video
                                        src={`${item.src}#t=1`}
                                        className="w-full h-full object-cover"
                                        muted
                                        playsInline
                                    />
                                )}
                                {item.type === 'video' && (
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-secondary transition-all">
                                            <Play size={32} className="text-white fill-current ml-1" />
                                        </div>
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                    <p className="text-gray-300 text-sm line-clamp-1">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                    onClick={() => setSelectedMedia(null)}
                >
                    <button
                        onClick={() => setSelectedMedia(null)}
                        className="fixed top-6 right-6 z-[210] p-3 bg-white/10 text-white rounded-full hover:bg-secondary transition-all"
                    >
                        <X size={32} />
                    </button>

                    <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl relative">
                            {selectedMedia.type === 'video' ? (
                                <video
                                    src={selectedMedia.src}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={selectedMedia.src}
                                    alt={selectedMedia.title}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                        <div className="mt-6 text-center text-white">
                            <h2 className="text-2xl font-black font-heading mb-2">{selectedMedia.title}</h2>
                            <p className="text-gray-400 max-w-3xl mx-auto">{selectedMedia.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
