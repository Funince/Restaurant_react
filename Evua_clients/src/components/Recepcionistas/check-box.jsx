import { CardRecept } from "./card-recept";
import "./check-box.css";


export function CheckBox({handleToggle, users}) {
  return (
    <>
      {users === undefined ? (
        <p>No hay meseros disponibles.</p>
      ) : (
        users.map(({ id, nombres, apellidos, countClient, promedio }) => (
          <label
            key={id}
            onClick={
              countClient == undefined
                ? () => handleToggle(id, nombres, apellidos)
                : null
            }
          >
            <article className="tw-followCard">
              <header className="tw-followCard-header">
                <CardRecept userName={nombres} initialCountClient={countClient} promedio={promedio}>
                  {nombres} {apellidos}
              
                </CardRecept>

                {countClient !== undefined && (
                  <input
                    type="checkbox"
                    className="ml-auto"
                    onChange={() => handleToggle(id, nombres, apellidos)}
                  />
                )}
              </header>
            </article>
          </label>
        ))
      )}
    </>
  );
}
