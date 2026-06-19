import React from 'react';
import { useOutletContext } from 'react-router-dom';

function ProfilePage() {
    const { hero, undo, history } = useOutletContext();

    return (
        <article>
            <h3>{hero.name}</h3>
            <span>{hero.gold}</span>
            <div>
                <button onClick={() => {undo()}}>Отмена</button>
                {history.length === 0 && (
                    <p>История пуста</p>
                )}
            </div>
        </article>
    );
}

export default ProfilePage;