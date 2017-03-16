import React, { PropTypes } from 'react';
import { Block, Text } from 'rebass';

const Content = ({
  paragraphs,
  scrollableHeader,
  scrollableParagraph,
}) => {
  const ScrollableHeader = scrollableHeader('h1');
  const ScrollableParagraph = scrollableParagraph(Block);

  return (
    <Block mt={4}>
      <ScrollableHeader>This is the main Header</ScrollableHeader>
      {paragraphs.map(p =>
        <ScrollableParagraph key={p.id} id={p.id}>
          <h2>{p.title}</h2>
          <Text>{p.content}</Text>
        </ScrollableParagraph>
      )}
    </Block>
  );
};

Content.propTypes = {
  paragraphs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  scrollableHeader: PropTypes.func.isRequired,
  scrollableParagraph: PropTypes.func.isRequired,
};

export default Content;
