'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
    return (
    <main className="shell error-page">
        <p className="eyebrow">CONNECTION INTERRUPTED</p>
        <h1>A brief intermission.</h1>
        <p>The portfolio couldn’t load right now. Please try again shortly.</p>
        <button
            className="button primary"
            onClick={reset}
        >Try again</button>
        </main>
        ); 
    }
