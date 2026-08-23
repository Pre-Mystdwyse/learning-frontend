import QuestCard from "../components/QuestCard";
import { QUESTS } from "../JS/quests";

function QuestPage() {
    return (
        <main>
            <h2 id="avialable-quests">Доступные квесты</h2>

            <section id="card-art" className="quest-board">
                {QUESTS.map((quest) => (
                    <QuestCard
                    key={quest.id}
                    quest={quest}
                    />
                ))}
            </section>

            <section id="inventory-section">
                <h3>Твоё снаряжение</h3>
                <ul id="inventory-list" />
                <button id="cancel-btn">Отмена</button>
            </section>
            <footer>
                <p>
                Игра на стадии идеи. Вполне возможно, что вовсе не выйдет, но кто знает...
                </p>
                <a
                className="git"
                href="https://github.com/Pre-Mystdwyse/learning-frontend"
                >
                <p>Угадай, куда ведёт эта ссылка?</p>
                </a>
            </footer>
        </main>

    )
}

export default QuestPage;