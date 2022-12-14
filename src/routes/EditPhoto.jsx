import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    fetch("https://gallery-app-server.vercel.app/photos",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl, captions, 
        createdAt: new Date().toDateString(), 
        updatedAt: new Date().toDateString(),
      })
    })
      .then((response) => response.json()) // mengubah response menjadi JSON
      .then((json) => {
        if(json.error){
          setError(json.error);
        } else {
          navigate('/photos');
        }
      }); // menampilkan response yang sudah dalam format JSON
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://gallery-app-server.vercel.app/photos")
    .then((response) => response.json()) // mengubah response menjadi JSON
    .then((json) => {
        setImageUrl(json.imageUrl);
        setCaptions(json.captions);
        setLoading(false);
    }).catch((error)=>{
      setError (error);
      setLoading(false);
    }); // menampilkan response yang sudah dalam format JSON
  }, [id]);

  if (error) return (
    <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Error!
        </h1>
  );

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
