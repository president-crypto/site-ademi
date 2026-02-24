import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Mettre à jour l'état pour que le prochain rendu affiche l'interface de secours.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Vous pouvez aussi enregistrer l'erreur dans un service de rapport d'erreurs
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // Vous pouvez afficher n'importe quelle interface de secours personnalisée
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-red-100 text-center">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 mb-4 font-heading">Oups ! Quelque chose s'est mal passé.</h1>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Nous sommes désolés pour ce désagrément. Une erreur inattendue est survenue.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20"
                        >
                            Recharger la page
                        </button>
                        {import.meta.env.DEV && (
                            <details className="mt-8 text-left bg-gray-50 p-4 rounded-xl border border-gray-100 overflow-auto max-h-40">
                                <summary className="text-xs font-bold text-gray-400 cursor-pointer uppercase tracking-widest">Détails de l'erreur</summary>
                                <pre className="mt-2 text-[10px] text-red-400 font-mono">
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
