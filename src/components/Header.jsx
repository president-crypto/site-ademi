import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navigation = [
        { name: 'Accueil', href: '/' },
        { name: 'Association', href: '/association' },
        { name: 'Médiathèque', href: '/galerie' },
        { name: 'Projets', href: '/projets' },
        { name: 'Formations', href: '/formations' },
        { name: 'Partenaires', href: '/partenaires' },
        { name: 'Soutenir', href: '/contact', isCta: true },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo-ademi.png" alt="ADEMI" className="h-16 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-2 py-2 rounded-md text-sm font-bold transition-all ${item.isCta
                                    ? 'bg-secondary text-white hover:bg-orange-600 shadow-md shadow-secondary/20 ml-2 px-4'
                                    : 'text-primary hover:text-secondary'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-primary hover:text-secondary focus:outline-none p-2"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-secondary hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
