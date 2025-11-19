import "./About.css";
function About() {
  return (
    <div className="aboutContainer">
      <h1 className="aboutTitle">About This Project</h1>
      <p className="text">
        This is a simple blog application built with React, where users can
        create, view, and manage posts. The app uses Firebase Realtime Database
        as its backend.
      </p>

      <h1 className="aboutSubtitle">Key Features</h1>
      <ul>
        <li>Create new posts with a title and description</li>
        <li>Edit existing posts</li>
        <li>Delete posts</li>
        <li>
          Automatic ID generation using <code>crypto.randomUUID()</code>
        </li>
        <li>Timestamps added to each post upon creation</li>
        <li>
          Success notifications (Toast) when posts are created, edited, or
          deleted
        </li>
        <li>Automatic navigation back to the homepage after actions</li>
        <li>Error handling for failed API requests</li>
        <li>
          <strong>Tech Stack:</strong> React, React Router, Firebase Realtime
          Database, Axios
        </li>
      </ul>
    </div>
  );
}

export default About;
