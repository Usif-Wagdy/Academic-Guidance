import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { BrandsImagesAPI } from "../../api/Api";
import { Col, Row } from "react-bootstrap";

export default function BrandPannel() {
  const [brandsImages, setBrandsImages] = useState([]);

  useEffect(() => {
    Axios.get(`${BrandsImagesAPI}`).then((res) => setBrandsImages(res.data));
  }, []);

  const showBrands = brandsImages.map((img, i) => (
    <Col key={i}>
      <img
        src={require(`../../Assets/brands/${img.image}`)}
        alt={`brand ${img.id}`}
      />
    </Col>
  ));

  return (
    <Row className="py-4 px-3 my-5 text-center bg-light">{showBrands}</Row>
  );
}
