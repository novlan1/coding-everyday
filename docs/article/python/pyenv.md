需要添加环境变量

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

立即生效：

```bash
exec "$SHELL"
```

pyenv 文档 

1. https://github.com/pyenv/pyenv
2. https://blog.csdn.net/weixin_42289080/article/details/127997003

