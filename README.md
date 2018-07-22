# 服务器环境参考

>https://www.microsoft.com/net/learn/get-started-with-dotnet-tutorial



```bash
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```

Install .NET SDK
Update the products available for installation, then install the .NET SDK.

In your command prompt, run the following commands:

```bash
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-2.1

```

# 编译脚本

参考``gen_temp_neo_contract.sh``


# NEO远程编译器

> 项目包含两个部分，一个是远程编译环境部分，一个是客户端部分，客户端部分封装成了Worker.js，方便IDE调用


# 服务器编译步骤

1. 收到.cs文件
2. 生成本次编译TaskId
3. 创建本次TaskId的临时项目
4. 将此项目 ``dotnet publish ``
5. 在workspace/testlib/中编译dotnet neon.dll {{TaskId}}.dll
6. 返回{{TaskId}}.avm


