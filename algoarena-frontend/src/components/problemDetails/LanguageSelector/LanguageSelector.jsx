import "./LanguageSelector.css";

function LanguageSelector({ language, setLanguage }) {

    const languages = [
        "Java"
    ];

    return (
        <div className="language-selector">

            <label htmlFor="language">
                LANGUAGE
            </label>

            <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                {languages.map((item) => (
                    <option
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>

        </div>
    );
}

export default LanguageSelector;