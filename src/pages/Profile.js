import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <>
      Ho va ten : {user.result.hovaten}
      DT : {user.result.sdt}
    </>
  );
};

export default Profile;
