import * as actionTypes from '../actions/actionTypes';
import agriculture from '../../assets/images/agriculture.jpg';
import education from '../../assets/images/education.jpg';
import food from '../../assets/images/food.jpg';
import greenEnergy from '../../assets/images/green-energy.jpg';
import medicine from '../../assets/images/medicine.jpg';
import prosthetics from '../../assets/images/prosthetics.jpg';
import sanitation from '../../assets/images/sanitation.jpg';
import transport from '../../assets/images/transport.jpg';

const availablePictures = [
  agriculture,
  education,
  food,
  greenEnergy,
  medicine,
  prosthetics,
  sanitation,
  transport,
];

const mockProjects = [
  {
    id: 1,
    picture: availablePictures[Math.floor(Math.random() * availablePictures.length)],
    title: 'Project A',
    author: 'User X',
    createdAt: '19/05/2005',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates sapiente quis? Odio nesciunt aspernatur enim illo iure expedita, ipsam temporibus placeat nobis quibusdam ipsum quas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus quod molestias cum optio magnam iusto, ullam adipisci porro animi sequi nihil nulla dolorem dolore corporis assumenda eveniet? Voluptas, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ab enim vero impedit consectetur eaque omnis veritatis iste repellendus nemo quas earum excepturi soluta possimus est magnam dicta laudantium ex.',
    tags: [
      { title: 'Tag A' },
      { title: 'Tag B' },
      { title: 'Tag C' },
    ],
    history: [
      { title: 'Update title #1', createdAt: '20/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #2', createdAt: '21/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #3', createdAt: '22/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #4', createdAt: '23/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
    ],
    feedbacks: [
      { author: 'User A', content: 'ipsum dolor sit amet consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 88 },
      { author: 'User B', content: 'animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 75 },
      { author: 'User A', content: 'consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat', approval: 69 },
    ],
    discoveries: [
      { title: 'Some discovery', description: 'BLABLABLABLABLABLABLABLABLA' },
      { title: 'Another discovery', description: 'BLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEE' },
      { title: 'Yet another discovery', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, animi quia! Quas distinctio earum illum, quia sunt libero quis, quidem ex tempore non temporibus hic, totam nam porro rerum. Earum.' },
    ],
    references: [
      { title: 'Reference A', description: 'yeyeyeyeye', link: 'http://someplace.org' },
      { title: 'Reference B', description: 'yiyiyiyiyi', link: 'http://someplaceelse.org' },
      { title: 'Reference C', description: 'qweqweqweqwe', link: 'http://qweqwe.org' },
      { title: 'Reference D', description: 'mamamamamama', link: 'http://mamamama.co' },
      { title: 'Reference E', description: 'rerorerorero', link: 'http://rerorero.jp' },
    ],
  },
  {
    id: 2,
    picture: availablePictures[Math.floor(Math.random() * availablePictures.length)],
    title: 'Project B',
    author: 'User Y',
    createdAt: '19/05/2005',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates sapiente quis? Odio nesciunt aspernatur enim illo iure expedita, ipsam temporibus placeat nobis quibusdam ipsum quas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus quod molestias cum optio magnam iusto, ullam adipisci porro animi sequi nihil nulla dolorem dolore corporis assumenda eveniet? Voluptas, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ab enim vero impedit consectetur eaque omnis veritatis iste repellendus nemo quas earum excepturi soluta possimus est magnam dicta laudantium ex.',
    tags: [
      { title: 'Tag A' },
      { title: 'Tag B' },
      { title: 'Tag C' },
    ],
    history: [
      { title: 'Update title #1', createdAt: '20/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #2', createdAt: '21/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #3', createdAt: '22/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #4', createdAt: '23/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
    ],
    feedbacks: [
      { author: 'User A', content: 'ipsum dolor sit amet consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 88 },
      { author: 'User B', content: 'animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 75 },
      { author: 'User A', content: 'consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat', approval: 69 },
    ],
    discoveries: [
      { title: 'Some discovery', description: 'BLABLABLABLABLABLABLABLABLA' },
      { title: 'Another discovery', description: 'BLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEE' },
      { title: 'Yet another discovery', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, animi quia! Quas distinctio earum illum, quia sunt libero quis, quidem ex tempore non temporibus hic, totam nam porro rerum. Earum.' },
    ],
    references: [
      { title: 'Reference A', description: 'yeyeyeyeye', link: 'http://someplace.org' },
      { title: 'Reference B', description: 'yiyiyiyiyi', link: 'http://someplaceelse.org' },
      { title: 'Reference C', description: 'qweqweqweqwe', link: 'http://qweqwe.org' },
      { title: 'Reference D', description: 'mamamamamama', link: 'http://mamamama.co' },
      { title: 'Reference E', description: 'rerorerorero', link: 'http://rerorero.jp' },
    ],
  },
  {
    id: 3,
    picture: availablePictures[Math.floor(Math.random() * availablePictures.length)],
    title: 'Project C',
    author: 'User Z',
    createdAt: '19/05/2005',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates sapiente quis? Odio nesciunt aspernatur enim illo iure expedita, ipsam temporibus placeat nobis quibusdam ipsum quas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus quod molestias cum optio magnam iusto, ullam adipisci porro animi sequi nihil nulla dolorem dolore corporis assumenda eveniet? Voluptas, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ab enim vero impedit consectetur eaque omnis veritatis iste repellendus nemo quas earum excepturi soluta possimus est magnam dicta laudantium ex.',
    tags: [
      { title: 'Tag A' },
      { title: 'Tag B' },
      { title: 'Tag C' },
    ],
    history: [
      { title: 'Update title #1', createdAt: '20/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #2', createdAt: '21/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #3', createdAt: '22/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #4', createdAt: '23/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
    ],
    feedbacks: [
      { author: 'User A', content: 'ipsum dolor sit amet consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 88 },
      { author: 'User B', content: 'animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 75 },
      { author: 'User A', content: 'consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat', approval: 69 },
    ],
    discoveries: [
      { title: 'Some discovery', description: 'BLABLABLABLABLABLABLABLABLA' },
      { title: 'Another discovery', description: 'BLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEE' },
      { title: 'Yet another discovery', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, animi quia! Quas distinctio earum illum, quia sunt libero quis, quidem ex tempore non temporibus hic, totam nam porro rerum. Earum.' },
    ],
    references: [
      { title: 'Reference A', description: 'yeyeyeyeye', link: 'http://someplace.org' },
      { title: 'Reference B', description: 'yiyiyiyiyi', link: 'http://someplaceelse.org' },
      { title: 'Reference C', description: 'qweqweqweqwe', link: 'http://qweqwe.org' },
      { title: 'Reference D', description: 'mamamamamama', link: 'http://mamamama.co' },
      { title: 'Reference E', description: 'rerorerorero', link: 'http://rerorero.jp' },
    ],
  },
  {
    id: 4,
    picture: availablePictures[Math.floor(Math.random() * availablePictures.length)],
    title: 'Project D',
    author: 'User X',
    createdAt: '19/05/2005',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates sapiente quis? Odio nesciunt aspernatur enim illo iure expedita, ipsam temporibus placeat nobis quibusdam ipsum quas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus quod molestias cum optio magnam iusto, ullam adipisci porro animi sequi nihil nulla dolorem dolore corporis assumenda eveniet? Voluptas, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ab enim vero impedit consectetur eaque omnis veritatis iste repellendus nemo quas earum excepturi soluta possimus est magnam dicta laudantium ex.',
    tags: [
      { title: 'Tag A' },
      { title: 'Tag B' },
      { title: 'Tag C' },
    ],
    history: [
      { title: 'Update title #1', createdAt: '20/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #2', createdAt: '21/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #3', createdAt: '22/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #4', createdAt: '23/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
    ],
    feedbacks: [
      { author: 'User A', content: 'ipsum dolor sit amet consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 88 },
      { author: 'User B', content: 'animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 75 },
      { author: 'User A', content: 'consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat', approval: 69 },
    ],
    discoveries: [
      { title: 'Some discovery', description: 'BLABLABLABLABLABLABLABLABLA' },
      { title: 'Another discovery', description: 'BLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEE' },
      { title: 'Yet another discovery', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, animi quia! Quas distinctio earum illum, quia sunt libero quis, quidem ex tempore non temporibus hic, totam nam porro rerum. Earum.' },
    ],
    references: [
      { title: 'Reference A', description: 'yeyeyeyeye', link: 'http://someplace.org' },
      { title: 'Reference B', description: 'yiyiyiyiyi', link: 'http://someplaceelse.org' },
      { title: 'Reference C', description: 'qweqweqweqwe', link: 'http://qweqwe.org' },
      { title: 'Reference D', description: 'mamamamamama', link: 'http://mamamama.co' },
      { title: 'Reference E', description: 'rerorerorero', link: 'http://rerorero.jp' },
    ],
  },
  {
    id: 5,
    picture: availablePictures[Math.floor(Math.random() * availablePictures.length)],
    title: 'Project E',
    author: 'User P',
    createdAt: '19/05/2005',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates sapiente quis? Odio nesciunt aspernatur enim illo iure expedita, ipsam temporibus placeat nobis quibusdam ipsum quas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus quod molestias cum optio magnam iusto, ullam adipisci porro animi sequi nihil nulla dolorem dolore corporis assumenda eveniet? Voluptas, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ab enim vero impedit consectetur eaque omnis veritatis iste repellendus nemo quas earum excepturi soluta possimus est magnam dicta laudantium ex.',
    tags: [
      { title: 'Tag A' },
      { title: 'Tag B' },
      { title: 'Tag C' },
    ],
    history: [
      { title: 'Update title #1', createdAt: '20/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #2', createdAt: '21/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #3', createdAt: '22/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #4', createdAt: '23/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
    ],
    feedbacks: [
      { author: 'User A', content: 'ipsum dolor sit amet consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 88 },
      { author: 'User B', content: 'animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 75 },
      { author: 'User A', content: 'consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat', approval: 69 },
    ],
    discoveries: [
      { title: 'Some discovery', description: 'BLABLABLABLABLABLABLABLABLA' },
      { title: 'Another discovery', description: 'BLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEE' },
      { title: 'Yet another discovery', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, animi quia! Quas distinctio earum illum, quia sunt libero quis, quidem ex tempore non temporibus hic, totam nam porro rerum. Earum.' },
    ],
    references: [
      { title: 'Reference A', description: 'yeyeyeyeye', link: 'http://someplace.org' },
      { title: 'Reference B', description: 'yiyiyiyiyi', link: 'http://someplaceelse.org' },
      { title: 'Reference C', description: 'qweqweqweqwe', link: 'http://qweqwe.org' },
      { title: 'Reference D', description: 'mamamamamama', link: 'http://mamamama.co' },
      { title: 'Reference E', description: 'rerorerorero', link: 'http://rerorero.jp' },
    ],
  },
  {
    id: 6,
    picture: availablePictures[Math.floor(Math.random() * availablePictures.length)],
    title: 'Project Z',
    author: 'User Z',
    createdAt: '19/05/2005',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates sapiente quis? Odio nesciunt aspernatur enim illo iure expedita, ipsam temporibus placeat nobis quibusdam ipsum quas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus quod molestias cum optio magnam iusto, ullam adipisci porro animi sequi nihil nulla dolorem dolore corporis assumenda eveniet? Voluptas, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ab enim vero impedit consectetur eaque omnis veritatis iste repellendus nemo quas earum excepturi soluta possimus est magnam dicta laudantium ex.',
    tags: [
      { title: 'Tag A' },
      { title: 'Tag B' },
      { title: 'Tag C' },
    ],
    history: [
      { title: 'Update title #1', createdAt: '20/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #2', createdAt: '21/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #3', createdAt: '22/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #4', createdAt: '23/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
    ],
    feedbacks: [
      { author: 'User A', content: 'ipsum dolor sit amet consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 88 },
      { author: 'User B', content: 'animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 75 },
      { author: 'User A', content: 'consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat', approval: 69 },
    ],
    discoveries: [
      { title: 'Some discovery', description: 'BLABLABLABLABLABLABLABLABLA' },
      { title: 'Another discovery', description: 'BLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEE' },
      { title: 'Yet another discovery', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, animi quia! Quas distinctio earum illum, quia sunt libero quis, quidem ex tempore non temporibus hic, totam nam porro rerum. Earum.' },
    ],
    references: [
      { title: 'Reference A', description: 'yeyeyeyeye', link: 'http://someplace.org' },
      { title: 'Reference B', description: 'yiyiyiyiyi', link: 'http://someplaceelse.org' },
      { title: 'Reference C', description: 'qweqweqweqwe', link: 'http://qweqwe.org' },
      { title: 'Reference D', description: 'mamamamamama', link: 'http://mamamama.co' },
      { title: 'Reference E', description: 'rerorerorero', link: 'http://rerorero.jp' },
    ],
  },
  {
    id: 7,
    picture: availablePictures[Math.floor(Math.random() * availablePictures.length)],
    title: 'Project X',
    author: 'User A',
    createdAt: '19/05/2005',
    introduction: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates sapiente quis? Odio nesciunt aspernatur enim illo iure expedita, ipsam temporibus placeat nobis quibusdam ipsum quas',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus quod molestias cum optio magnam iusto, ullam adipisci porro animi sequi nihil nulla dolorem dolore corporis assumenda eveniet? Voluptas, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, ab enim vero impedit consectetur eaque omnis veritatis iste repellendus nemo quas earum excepturi soluta possimus est magnam dicta laudantium ex.',
    tags: [
      { title: 'Tag A' },
      { title: 'Tag B' },
      { title: 'Tag C' },
    ],
    history: [
      { title: 'Update title #1', createdAt: '20/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #2', createdAt: '21/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #3', createdAt: '22/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
      { title: 'Update title #4', createdAt: '23/05/2005', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis' },
    ],
    feedbacks: [
      { author: 'User A', content: 'ipsum dolor sit amet consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 88 },
      { author: 'User B', content: 'animi fuga eum? Blanditiis, repellat fuga. Ea consectetur voluptatibus', approval: 75 },
      { author: 'User A', content: 'consectetur adipisicing elit. Ad animi fuga eum? Blanditiis, repellat', approval: 69 },
    ],
    discoveries: [
      { title: 'Some discovery', description: 'BLABLABLABLABLABLABLABLABLA' },
      { title: 'Another discovery', description: 'BLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEEBLEE' },
      { title: 'Yet another discovery', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, animi quia! Quas distinctio earum illum, quia sunt libero quis, quidem ex tempore non temporibus hic, totam nam porro rerum. Earum.' },
    ],
    references: [
      { title: 'Reference A', description: 'yeyeyeyeye', link: 'http://someplace.org' },
      { title: 'Reference B', description: 'yiyiyiyiyi', link: 'http://someplaceelse.org' },
      { title: 'Reference C', description: 'qweqweqweqwe', link: 'http://qweqwe.org' },
      { title: 'Reference D', description: 'mamamamamama', link: 'http://mamamama.co' },
      { title: 'Reference E', description: 'rerorerorero', link: 'http://rerorero.jp' },
    ],
  },
];

const initialState = {
  projects: mockProjects,
  error: null,
};

const filterProjectsByTitle = (state, action) => {
  let filteredProjects = state.projects.filter(project => project.title.startsWith(action.title));
  if (filteredProjects.length === 0 || action.title.length === 0) {
    filteredProjects = initialState.projects;
  }
  return {
    ...state,
    projects: filteredProjects,
  };
};

const fetchProjectsSuccess = (state, action) => {
  return {
    ...state,
    projects: action.projects,
  };
};

const fetchProjectsFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_PROJECTS_TITLE: return filterProjectsByTitle(state, action);
    case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAILURE: return fetchProjectsFailure(state, action);
    default: return state;
  }
};

export default reducer;
