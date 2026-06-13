'use client';

export default function Loading() {
    return (
        <div className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
                <div className="loader-container">
                    <div className="loading-text">Chargement<span className="dots"></span></div>
                </div>
            </div>
        </div>
    );
}