import React, { useRef, useState } from 'react';
import ListItem from './Components/List/ListItem';

const App = () => {
  const draggingTopic = useRef();
  const dragOverTopic = useRef();

  const draggingChapter = useRef();
  const dragOverChapter = useRef();

  const [isChapterDragging, setIsChapterDragging] = useState(true);

  const [data, setData] = useState([
    {
      id: 0,
      chapterTitle: 'Number System',
      topics: [
        {
          id: 'Red',
          name: 'Introduction',
        },
        {
          id: 'Green',
          name: 'Addition and multipliation theorams',
        },
        {
          id: 'Blue',
          name: 'Power theorams',
        },
        {
          id: 'Yellow',
          name: 'Logarithim and exponents',
        },
      ],
    },
    {
      id: 1,
      chapterTitle: 'Geometry',
      topics: [
        {
          id: 'Black',
          name: 'Introduction',
        },
        {
          id: 'White',
          name: 'Circle and Ellipses',
        },
        {
          id: 'Orange',
          name: 'Lines and graphs',
        },
      ],
    },
  ]);

  const handleTopicDragStart = (e, { chapterIndex, topicIndex }) => {
    console.log('handle started');
    setIsChapterDragging(false);
    draggingTopic.current = { chapterIndex, topicIndex };
  };

  const handleTopicDragEnd = (e) => {
    setIsChapterDragging(true);
    console.log(draggingTopic.current, dragOverTopic.current);
    let dataCopy = JSON.parse(JSON.stringify(data));
    if (
      draggingTopic.current.chapterIndex === dragOverTopic.current.chapterIndex
    ) {
      const index = dragOverTopic.current.topicIndex;
      const chapter = dataCopy[draggingTopic.current.chapterIndex];
      if (draggingTopic.current.topicIndex > index) {
        chapter.topics.splice(
          index,
          0,
          chapter.topics[draggingTopic.current.topicIndex]
        );
        chapter.topics.splice(draggingTopic.current.topicIndex + 1, 1);
      } else if (draggingTopic.current.topicIndex < index) {
        chapter.topics.splice(
          index + 1,
          0,
          chapter.topics[draggingTopic.current.topicIndex]
        );
        chapter.topics.splice(draggingTopic.current.topicIndex, 1);
      }
      dataCopy[draggingTopic.current.chapterIndex] = chapter;
      setData(dataCopy);
    } else {
      // inter group movement
      const draggingChapter = dataCopy[draggingTopic.current.chapterIndex];
      const dragOverChapter = dataCopy[dragOverTopic.current.chapterIndex];
      const draggingTopicIndex = draggingTopic.current.topicIndex;
      const dragOverTopicIndex = dragOverTopic.current.topicIndex;

      dragOverChapter.topics.splice(
        dragOverTopicIndex,
        0,
        draggingChapter.topics[draggingTopicIndex]
      );

      draggingChapter.topics.splice(draggingTopicIndex, 1);

      dataCopy[dragOverTopic.current.chapterIndex] = dragOverChapter;
      dataCopy[draggingTopic.current.chapterIndex] = draggingChapter;
      setData(dataCopy);
    }
    draggingTopic.current = null;
    dragOverTopic.current = null;
  };

  const handleTopicDragEnter = (e, { chapterIndex, topicIndex }) => {
    dragOverTopic.current = { chapterIndex, topicIndex };
  };

  const handleChapterDragStart = (e, chapterIndex) => {
    draggingChapter.current = chapterIndex;
  };

  const handleChapterDragEnd = (e) => {
    if (!isChapterDragging) return;
    const copyData = JSON.parse(JSON.stringify(data));
    const draggingIndex = draggingChapter.current;
    const draggedOverIndex = dragOverChapter.current;

    if (draggingIndex > draggedOverIndex) {
      copyData.splice(draggedOverIndex, 0, copyData[draggingIndex]);
      copyData.splice(draggingIndex + 1, 1);
    } else if (draggingIndex < draggedOverIndex) {
      copyData.splice(draggedOverIndex + 1, 0, copyData[draggingIndex]);
      copyData.splice(draggingIndex, 1);
    }
    draggingChapter.current = null;
    dragOverChapter.current = null;
    setData(copyData);
  };

  const handleChapterDragEnter = (e, chapterIndex) => {
    dragOverChapter.current = chapterIndex;
  };

  return (
    <div>
      <ListItem>
        {data &&
          data.map((chapter, chapterIndex) => (
            <ListItem.Chapter
              chapterTitle={chapter.chapterTitle}
              key={chapterIndex}
              chapterIndex={chapterIndex}
              onDragStart={handleChapterDragStart}
              onDragEnd={handleChapterDragEnd}
              onDragEnter={handleChapterDragEnter}
            >
              {chapter.topics.map((topic, topicIndex) => (
                <ListItem.Chapter.Topic
                  key={topicIndex}
                  name={topic.name}
                  chapterIndex={chapterIndex}
                  topicIndex={topicIndex}
                  onDragStart={handleTopicDragStart}
                  onDragEnd={handleTopicDragEnd}
                  onDragEnter={handleTopicDragEnter}
                />
              ))}
            </ListItem.Chapter>
          ))}
      </ListItem>
    </div>
  );
};

export default App;
