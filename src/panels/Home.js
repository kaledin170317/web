import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  const getImage = async () => {
    var t = await fetch("https://random-image-pepebigotes.vercel.app/lists/skeleton-images-list.json")
    var json = await t.json();
    return  json.images[getRandomInt(json.images.length)];
  }

  const getStory = async (e) => {
    // var image = "https://i.imgflip.com/2/7az33i.jpg";
    var image = getImage();
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url : image,
      attachment: {
        text: 'book',
        type: 'photo',
        owner_id: 743784474,
        id: 12345678
      }})
        .then((data) => {
          if (data.code_data) {
            // Редактор историй открыт
            console.log(data);
          }})
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
  }


  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group>

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={(e) => getStory(e)}>
            Покажите Персика, пожалуйста! 2
          </Button>
        </Div>
      </Group>


    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
