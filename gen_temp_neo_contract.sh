
if [ $# -lt 2 ]; then
echo "命令执行缺少参数"
echo "e.g: [project_name][contract_file_path]"
exit 1; 
fi

neo_workspace_path="/home/ubuntu/neo_workspace"
out_put_path="/home/ubuntu/neo_workspace/avm_output/"
cd $neo_workspace_path
echo "Start create NEO Contract Project $1"
temp_project_folder="neo_temp_project_$1"
final_folder_path=${neo_workspace_path}"/"${temp_project_folder}
echo $final_folder_path
mkdir -p $final_folder_path
cd $final_folder_path
dotnet new classlib
rm ./Class1.cs
dotnet add package Neo.SmartContract.Framework --version 2.5.4
echo $final_folder_path" Project created"

# 将文件写入拷贝到项目文件夹
cp $2 $final_folder_path"/"${temp_project_folder}".cs"
# 编译
dotnet publish -o ../testlib
echo "public "${temp_project_folder}".dll"


# 生成avm
cd /home/ubuntu/neo_workspace/testlib
dotnet neon.dll ${temp_project_folder}".dll"
cp ${temp_project_folder}".dll" ../avm_output/

#清理环境
echo "Clean Temp Info"
rm ${temp_project_folder}.*
rm -rf $final_folder_path

echo "avm gen success in "${out_put_path}${temp_project_folder}".avm"
