export {
  authenticate,
  isLoggedIn,
} from './authentication';

export {
  createUser,
  fetchUser,
  fetchUsers,
  filterUsersByName,
} from './users';

export {
  createProject,
  fetchProject,
  fetchProjects,
  filterProjectsByTitle,
  deleteProject,
  updateProject,
} from './projects';

export {
  createNewsArticle,
  fetchNewsArticle,
  fetchNewsArticles,
  updateNewsArticle,
} from './newsArticles';

export {
  createDiscovery,
  fetchDiscovery,
  updateDiscovery,
} from './discoveries';
