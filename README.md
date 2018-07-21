# 步骤

1. 收到.cs文件
2. 生成本次编译TaskId
3. 创建本次TaskId的临时项目
4. 将此项目 ``dotnet publish ``
5. 在workspace/testlib/中编译dotnet neon.dll {{TaskId}}.dll
6. 返回{{TaskId}}.avm

