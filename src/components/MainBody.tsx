import { ReactNode } from "react";

interface Props {
  sideBar: ReactNode;
  gamesCtr: ReactNode;
}
function MainBody({ sideBar, gamesCtr }: Props) {
  return (
    <>
      <div className="main-body-ctr">
        {sideBar}
        {gamesCtr}
      </div>
    </>
  );
}

export default MainBody;
