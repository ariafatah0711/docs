# redhat repo
## install redhat with cli
- before install in option installasion click "TAB"
- and add in prompt "inst.text"

## mount package by iso
- click icon iso in bottom window virtual machine red hat
  - and click rhel9dvd or ur iso red hat
- make folder /mnt/disc/ ```mkdir -p /mnt/disc/```
- mount repository ```mount /dev/sr0 /mnt/disc/```
- auto mounting
  ```bash
  echo `>`> /etc/fstab `<`< EOF
  /dev/sr0    /mnt/disc   iso9660    defaults    0 0
  EOF

  mount -a
  ```
- make file repository conf with ```vi /etc/yum.repos.d/rhel9dvd.repo```
  ```bash
  [BaseOS]
  name=BaseOS Package Red Hat Enterprise Linux 9
  metadata_expire=-1
  gpgcheck=1
  enabled=1
  baseurl=file:///mnt/disc/BaseOS/
  gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release

  [AppStream]
  name=AppStream Packages Red Hat Enterprise Linux 9
  metadata_expire=-1
  gpgcheck=1
  enabled=1
  baseurl=file:///mnt/disc/AppStream/
  gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release
  ```

- change subscription manager conf with ```vi /etc/yum/pluginconf.d/subscription-manager.conf```
  - change enabled 1 to 0
  
## mount package with server repo
- file repo with server repo
  ```bash
  [BaseOS]
  name=BaseOS
  gpgcheck=0
  enabled=1
  baseurl=http://10.1.10.211/rhel9.4/BaseOS

  [AppStream]
  name=AppStream
  gpgcheck=0
  enabled=1
  baseurl=http://10.1.10.211/rhel9.4/AppStream  
  ```

---
## rhsm, mematikan repo luar
- vi /etc/rhsm/rhsm.conf
  ```bash
  manage_repos = 0
  ```
    
## with dnf
```bash
dnf config-manager --add-repo "http://10.1.10.211/rhel9.4/BaseOS"
echo "gpgcheck=0" `> /etc/yum.repos.d/10.1.10.211_rhel9.4_BaseOS.repo
```

## test repo
```bash
yum clean all
yum repolist
```

---
# redhat repository server
- [https://www.serverlab.ca/tutorials/linux/network-services/creating-a-yum-repository-server-for-red-hat-and-centos/](https://www.serverlab.ca/tutorials/linux/network-services/creating-a-yum-repository-server-for-red-hat-and-centos/)

## install package
```bash
yum install createrepo
```
## create dir repo
```bash
mkdir -p /repos/CentOS/6/5/Packages

# create repo
createrepo /repos/CentOS/6/5

# update
createrepo --update /repos/CentOS/6/5
```
- Using the ISO or Installation Disc
```bash
## centos
cp -arv /media/CentOS/Packages/* /repos/CentOS/6/5/

## redhat
cp -arv /mnt/disc /repos/redhat
createrepo /repos/CentOS/6/5
```

## publish
### over httpd
```bash
yum install httpd
ln -s /var/www/html/CentOS /repos/CentOS
```
## over vsftpd
```bash
yum install vsftpd
ln -s /var/ftp/public/CentOS /repos/CentOS
```

## Configure Repository on Client
```bash
cd /etc/yum.repos.d
cat `> local.repo `<`< EOF
[mylocalrepo]
name=Local CentOS Repo
baseurl=http://my-repo-server/CentOS/6/5
gpgcheck=0
EOF
```