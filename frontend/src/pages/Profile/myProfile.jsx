import "./myProfile.css";

const MyProfile = () => {
  return (
    <>
      <div className="quizCreationPageContainer">
        <form id="quizCreationFormContainer">
          <h1 id="titleQuizCreation">My profile</h1>
          <div className="secondSectionContainer">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyProfile;
