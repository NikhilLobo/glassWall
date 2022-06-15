import { useEffect, useState } from "react";
import { Image, Card, Row, Col } from "antd";
import { API_KEY, API_URL } from "../api/config";
import Favourite from "./UI/Favourite";
import LikeComponent from "./UI/LikeComponent";
import DislikeComponent from "./UI/DislikeComponent";
import Votes from "./UI/Votes";
import useFetch from "../hooks/useFetch";

const Home = ({ uploadNumber }) => {
  const [votes, setVotes] = useState([]);
  const [voteUpdate, setVoteUpdate] = useState(0);
  const { data: imageUrlList, isLoading, error } = useFetch(uploadNumber);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/votes`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      const data = await response.json();
      setVotes(data);
    };
    if (uploadNumber) {
      fetchData();
    }
  }, [voteUpdate, uploadNumber]);

  const apiHelper = async (url, data = {}, method = "GET") => {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(data),
    });
  };

  const submitFavourite = async (e) => {
    const res = await apiHelper(
      `${API_URL}/favourites`,
      { image_id: e?.id },
      "POST"
    );
    if (res.ok) {
      console.log("Added as faviourite");
    }
  };

  const submitVote = async (e) => {
    const res = await apiHelper(
      `${API_URL}/votes`,
      { image_id: e?.id, value: 1 },
      "POST"
    );
    if (res.ok) {
      setVoteUpdate((voteUpdate) => voteUpdate + 1);
    }
  };
  const deleteVote = async (e) => {
    const { id } = e;
    const voteId = votes?.find((item) => item.image_id === id);
    if (voteId) {
      const res = await apiHelper(
        `${API_URL}/votes/${voteId?.id}`,
        {},
        "DELETE"
      );
      if (res.ok) {
        setVoteUpdate((voteUpdate) => voteUpdate + 1);
      }
    }
  };
  return (
    <>
      <p>Uploaded images</p>
      <Row>
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {imageUrlList?.message && (
          <div>Loading images failed... Please contact admin.</div>
        )}
        {!imageUrlList?.message &&
          imageUrlList &&
          imageUrlList?.map((item, index) => (
            <Col xs={24} sm={12} md={12} lg={8} xl={6} key={item.id}>
              <Card
                style={{
                  width: 300,
                  margin: 10,
                }}
                key={item.id}
                actions={[
                  <Favourite
                    key={item.id}
                    item={item}
                    submitFavourite={submitFavourite}
                  />,
                  <LikeComponent
                    key={item.id}
                    item={item}
                    submitVote={submitVote}
                  />,

                  <DislikeComponent
                    key={item.id}
                    item={item}
                    deleteVote={deleteVote}
                  />,
                  <Votes
                    votes={votes.filter(
                      (image) => image.image_id === item.id && image.value === 1
                    )}
                    key={item.id}
                    uploadNumber={uploadNumber}
                    item={item}
                  />,
                ]}
              >
                <Image width={250} src={item.url} />
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};
export default Home;
