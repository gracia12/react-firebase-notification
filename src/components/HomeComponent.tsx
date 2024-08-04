import { FC } from "react";
import "../Sass/HomeComponent.scss";
import PostStatus from "./common/PostUpdate";

interface HomeComponentProps {
  currentUser: string;
}

const HomeComponent: FC<HomeComponentProps> = ({ currentUser }) => {
  return (
    <div className="home-component">
      <PostStatus currentUser={currentUser} />
    </div>
  );
}

export default HomeComponent;