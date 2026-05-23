## Intro

This repo shows my educational research on Reinforcement Learning. 
Originally, I have covered basics of AI-powered decision making in class on AI, which introduced me to game environment from [CS188 of Berkeley](https://inst.eecs.berkeley.edu/~cs188/archive/fa24/projects/), but only topics of Adversarial Search and Games were covered in auditorium. It was not enough for me for some reason : )
Since I have been exposed to Q value, Reward, Value and Policy Iteration, I was curious how to actually wire this theory with actually programmed instance.

## How do I start

1. Choose your favorite folder to store code
2. Open it with Terminal
3. `git clone https://github.com/georgerieh/cartrack-rl-agent.git`
4. You are doing alright

## How did I actually explore it
Short Answer: I was curious and could not stop until I won.

Long answer is like this:
1. I found this [tutorial](https://colab.research.google.com/github/pytorch/tutorials/blob/gh-pages/_downloads/c195adbae0504b6504c93e0fd18235ce/mario_rl_tutorial.ipynb#scrollTo=msENhfAzziNc) first
2. Because it uses outdated package `gym` (fun fact, it was maintained by OpenAI), I should have been migrating all to the package `gymnasium`. While guides promised the migration should be smooth, I never succeceded to migrate. So I browsed other games available in [gymnasium environment](https://ale.farama.org/environments/complete_list/)
3. After trying a new game Mario from the available ones, I realised it does not make me curious to solve it (It was different in strategy and gameplay).
4. That is why I found CarTrack-v3: I love cars, driving, and it promised to be a huge win. At least it is interesting: tracks are different each run, there are all kind of actions (left, right, gas, break, nothing) so...
5. Was it simple to solve? NO. I even tried to hijack the actions and intervene into decisions, but gladly I abandoned this approach. It was problem in code that was fixed later (but probably introduced by me too) 
6. Was I able to achieve result? Yes. I could refine strategy even more, but it was not the point

For obvious reasons, code has changed significantly, but I want to pay tribute to all maintaners of those repositories to make me learn something new.

## How do you try yourself?
- If you want to see it in action, you can run section **Bigger training** from [rl_tutorial.ipynb](https://github.com/georgerieh/cartrack-rl-agent/blob/main/mario_rl_tutorial.ipynb).
Especially you can see the progress section at last cell to see what is 
- If you want to learn it, I suggest to try to repack the whole section of Bigger Training to one big cell of code, without loss of code running ability. You can also try to modify different paramters to tune it (I did it too, its just I am not smart enough to commit every single time)

I happy to chat if you are interested with {my_github_user_name}@gmail.com
