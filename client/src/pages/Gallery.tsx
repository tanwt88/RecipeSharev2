import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';


interface Recipe {
  id: string;
  name: string;
  ratings: number;
  photo_URL: string;
  favorite: boolean;
  user_id:string;
}

interface GalleryProps {
  searchTerm: string;
  sortOption: string;
}

function Gallery({ searchTerm, sortOption }: GalleryProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 9; // 3 columns x 3 rows
  const current_user = useParams<{ id: string }>();
  const admins=[{id:'admin1'},{id:'admin2'},{ id: 'admin3' }];
  const admin_id = admins.map(admin => admin.id);

  useEffect(() => {
    loadRecipes();
  }, [searchTerm, sortOption]);

  const loadRecipes = () => {
    fetch(`/home/${current_user}/`)
      .then(res => res.json())
      .then(data => {
        setRecipes(prevRecipes => [...prevRecipes, ...data]);
        setHasMore(data.length === limit);
        setPage(prevPage => prevPage + 1);
      })
      .catch(error => console.log(error));
  };

  const handleFavorite = (index: number) => {
    const updatedRecipes = [...recipes];
    const recipeID = updatedRecipes[index].id.toString();
    updatedRecipes[index].favorite = !updatedRecipes[index].favorite;
    setRecipes(updatedRecipes);
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={recipes.length}
        next={loadRecipes}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>No more recipes</h4>}
      >
        <Row>
          {recipes.map((recipe, id) => (
            <Col key={id} xs={12} md={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={recipe.photo_URL} />
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>{recipe.ratings.toFixed(1)} stars</Card.Text>
                  <Button
                    variant={recipe.favorite ? 'danger' : 'outline-danger'}
                    size="sm"
                    className="float-right"
                    onClick={() => handleFavorite(id)}
                  >
                    {recipe.favorite ? 'Remove Favorite' : 'Add Favorite'}
                  </Button>
                  {current_user === recipe.user_id ? (
                    <Link
                      to={`/home/${current_user.id?.toString()}/editrecipe/${recipe.id.toString()}`}
                      className="btn btn-primary btn-sm mr-1"
                    >
                      Edit Recipe
                    </Link>
                  ):null}
                  {current_user.id && (current_user.id === recipe.user_id || admin_id.includes(current_user.id)) ? (
  <Link
    to={`/home/${current_user.id}/deleterecipe/${recipe.id}`}
    className="btn btn-primary btn-sm mr-1"
  >
    Delete Recipe
  </Link>
) : null}


                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </Container>
  );
}

export default Gallery;
