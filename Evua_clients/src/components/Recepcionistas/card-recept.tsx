import { ReactNode, useState } from "react";

interface CardReceptProps {
  children: ReactNode;
  userName: string;
  initialCountClient: number;
}

export function CardRecept({
  children,
  userName,
  initialCountClient,
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
        <span className="tw-followCard-infoUserName">
          Clientes atendidos: {initialCountClient}
        </span>
      </div>
    </>
  );
}
