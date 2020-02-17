import { GithubApiService } from './GithubApiService';
import * as _ from 'lodash';
import { User } from './User';
import { Repo } from './Repo';

let svc = new GithubApiService();
if (process.argv.length < 3) {
    console.log('Please pass the username as an argument!')
} else {
    let userName = process.argv[2];
svc.getUserInfo(userName, (user: User) => {
    svc.getRepos(userName, (repos: Repo[]) => {
        let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.size * -1]);
        let topRepos = _.take(sortedRepos, 5);
        user.repos = topRepos;

        console.log(user);
    });
});
}
