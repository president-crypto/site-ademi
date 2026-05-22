import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('ademi_cookies_accepted');
        if (!accepted) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem('ademi_cookies_accepted', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md text-white px-4 py-4 shadow-2xl border-t border-gray-700">
            <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center gap-4 justify-between">
                <div className="flex items-start gap-3 text-sm text-gray-300">
                    <Cookie size={20} className="text-secondary shrink-0 mt-0.5" />
                    <p>
                        Ce site utilise des cookies techniques nécessaires à son fonctionnement.
                        En continuant votre navigation, vous acceptez leur utilisation.
                    </p>
                </div>
                <button
                    onClick={accept}
                    className="shrink-0 px-6 py-2.5 bg-secondary hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap"
                >
                    Accepter
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
