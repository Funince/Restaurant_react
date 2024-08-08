import { CardRecept } from "./card-recept";
import "./check-box.css";



export function CheckBox({handleToggle, users}) {
  return (
    <>
      {users.map(({ id, nombres, apellidos, countClient }) => (
        <label key={id}>
          <article className="tw-followCard">
            <header className="tw-followCard-header">
              <CardRecept userName={nombres} initialCountClient={countClient}>
                {nombres + " " + apellidos}
              </CardRecept>
              <input
                type="checkbox"
                className="ml-auto"
                onChange={() => handleToggle(id)}
              />
            </header>
          </article>
        </label>
      ))}
    </>
  );
}
