import React, { useState } from "react";

import {
  Container,
  Wrapper,
  CardFrontContainer,
  CardBackContainer,
} from "./FlipCardElements";
import { Autorenew } from "@material-ui/icons/";

const FlipCard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      <Container>
        <Wrapper className={flipped ? "flipped" : ""}>
          <CardFrontContainer>
            <Autorenew onClick={() => setFlipped(!flipped)} />
            {front}
          </CardFrontContainer>

          <CardBackContainer>
            <Autorenew onClick={() => setFlipped(!flipped)} />
            {back}
          </CardBackContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default FlipCard;
