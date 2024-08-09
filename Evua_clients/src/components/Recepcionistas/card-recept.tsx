import { ReactNode, useState } from "react";

interface CardReceptProps {
  children: ReactNode;
  userName: string;
  initialCountClient: number;
  promedio:Float32Array;
}

export function CardRecept({
  children,
  userName,
  initialCountClient,
  promedio,
}: CardReceptProps) {

  return (
    <>
      <img
        className="tw-followCard-avatar"
        alt="El avatar de midudev"
        src={`https://unavatar.io/${userName}`}
      />
      <div className="tw-followCard-info">
        <strong>{children}</strong>
        {initialCountClient!==undefined && <span className="tw-followCard-infoUserName">
          Clientes atendidos: {initialCountClient}
        </span>}
        {promedio!==undefined && <span className="tw-followCard-infoUserName">
          Promedio: {promedio}
        </span>}
      </div>
    </>
  );
}
