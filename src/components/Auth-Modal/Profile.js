const Profile = ({userNameFromEmail}) => {
    const userName = localStorage.getItem("userName");
    const enteredName = userName || userNameFromEmail

    return<>
    <p>welcoem {enteredName}</p>
    <p>have a nice shoping!</p>
    </>
}

export default Profile;