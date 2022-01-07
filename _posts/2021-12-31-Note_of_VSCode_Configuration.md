---
title: 'Note_of_VSCode_Configuration'
date: 2021-12-31
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
teaser: "/images/20211231_note_of_vscode/vscode_cover.png"
tags:
  - GPU 
  - Notebook
  - Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Notes of my VSCode configuration.

**Contents:**


## 1. Introduction

## 2. My favorite extensions

- file-tree-generator by Shinotatwu-DS
- kite
- 

## 3. Run c/c++ with VSCode
Reference: <https://code.visualstudio.com/docs/cpp/config-mingw>



### 4. Integrate Cmder and other temminal into VSCode

Download Cmder and put it into folder `D:\Downloads`.

Open `Preferences: Open Settings (JSON)`, add below code:

```bash
"terminal.integrated.profiles.windows": {
        "PowerShell": { "source": "PowerShell", "icon": "terminal-powershell" },
        "CommandPrompt": {
          "path": [
            "${env:windir}\\Sysnative\\cmd.exe",
            "${env:windir}\\System32\\cmd.exe"
          ],
          "icon": "terminal-cmd"
        },
        "GitBash": {
          "path": ["D:\\chengxu\\Git\bin\\bash.exe"],
          "source": "Git Bash",
          "icon": "terminal-bash"
        },
        "Cmder": {
          "path": "${env:windir}\\System32\\cmd.exe",
          "args": ["/k", "D:\\Downloads\\cmder\\vendor\\bin\\vscode_init.cmd"]
        }
      },
    // Choose Default Terminal
    "terminal.integrated.defaultProfile.windows": "Cmder"
    // "terminal.integrated.defaultProfile.windows": "GitBash"
    // "terminal.integrated.defaultProfile.windows": "CommandPrompt"
    // "terminal.integrated.defaultProfile.windows": "PowerShell",
```


