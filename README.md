# EIT Digital Alumni Website

This is the repository for the EIT Digital Alumni Project. This branch is built upon the [drupal-composer/drupal-project](https://github.com/drupal-composer/drupal-project) and [docker4drupal](https://github.com/wodby/docker4drupal) - refer to the respective documentations whenever necessary.
All the configuration and content is present in this repository and no database dump is required.

## Step 1: Preparation

In order to test this profile, follow these steps:

    git clone git@github.com:EIT-Digital-Alumni/hackathon.alumni.eitdigital.eu.git
    cd alumni.eitdigital.eu
    cp .env.example .env
    nano .env

Change the necessary environment variables, according to the comments in the file.

## Step 2 / Option 1: Running the website in a docker container - Linux / MacOS (Recommended)

*Currently this option is only available on Linux & MacOS*
Make sure that you have [Docker](https://docs.docker.com/get-docker/) installed.

### Preliminary steps for MacOS Users

In order to achieve the best performance for file operations, we use Mutagen for file syncronisation. This can be enabled with a couple of simple steps:

Install Mutagen

    brew install mutagen-io/mutagen/mutagen

Start the Mutagen container 

    make mutagen

### Launching docker4drupal

To launch the containers, simply run `make up`.

Then start a shell inside the main container with `make shell`. Execute all the following steps inside this shell (incide the container)

### Stopping the containers

You can stop the containrers by running `make stop`.

For MacOS users, also stop the Mutagen project my running `mutagen project terminate -f config.yml`.

## Step 2 / Option 2: Running the website in LAMP/XAMPP/WAMP - Windows / Linux / MacOS

*If you run the website in a container all these applications are pre-installed in the container*

Install [LAMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04)/[XAMPP](https://www.apachefriends.org/index.html)/[WAMP](https://www.wampserver.com/en/) depending on your choice. 

Install [Composer](https://getcomposer.org/download/) on your machine.

Install [Drush](https://docs.drush.org/en/8.x/install-alternative/) on your machine.

## Step 3: Install the website

To download the necessary dependencies:

    composer install
    
As our site comes with configuration and content, there is a script to install the site from configuration:

    chmod u+x config-install.sh
    ./config-install.sh

To install an empty site there is a bundled quick install (not recommended, unless you don't want any configuration installed):

    chmod u+x env-install.sh
    ./env-install.sh

After a first time install, change the `settings.php` file to use `settings.local.php` instead:

    chmod u+w web/sites/default/settings.php
    nano web/sites/default/settings.php

Comment out the database settings block and add the following lines to the end of the file:

    if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
      include $app_root . '/' . $site_path . '/settings.local.php';
    }

Finally, clear the cache:

    ../vendor/bin/drush cr
    
### Reinstalling the website during development.

Simpy run the installation from configuration again:

    ./config-install.sh
    
## Working with Drupal 8 Configuration Management

The EIT Digital Alumni Website uses [Drupal 8 Confuration Management](https://www.drupal.org/docs/configuration-management).

### Importing the configuration from ../config/sync into the database

    ../vendor/bin/drush cim
    
### Exporting the configuration from the database to ../config/sync

    ../vendor/bin/drush cex
    
## Working with the content

As most of the functionality in our website is defined as custom blocks, all site content is also provided in the repository and can be imported.

### Preparations for importing content

Specify the content directory in settings.php by adding the following lines to the end of the file:

    global $content_directories;
    $content_directories['sync'] = $app_root.'/../content/sync';

As content is linked to the UUID of the admin and anonymous user, it is needed to update the uuid of the users. 
**Only do this after a fresh install and before creating any other content manually**

    ../vendor/bin/drush sqlq "UPDATE users SET uuid = '7a10687b-9aea-4694-8fbf-d354bafa749a' WHERE uid = 1"
    ../vendor/bin/drush sqlq "UPDATE users SET uuid = '9639581f-7ccc-4168-a0fa-5ff204d2157b' WHERE uid = 0"

### Importing the content from ../content/sync into the database

    ../vendor/bin/drush csi
    
### Exporting the content from the database into ../content/sync

    ../vendor/bin/drush cse
    
## Troubleshooting

Some common issues and quick solutions...

### Scaffolding permissions issue

Composer require or update may fail because the scaffold plugin cannot replace files in `web/sites/default`; fix with `chmod u+w web/sites/default`.

---

## What does the template do?

When installing the given `composer.json` some tasks are taken care of:

* Drupal will be installed in the `web`-directory.
* Autoloader is implemented to use the generated composer autoloader in `vendor/autoload.php`,
  instead of the one provided by Drupal (`web/vendor/autoload.php`).
* Modules (packages of type `drupal-module`) will be placed in `web/modules/contrib/`
* Theme (packages of type `drupal-theme`) will be placed in `web/themes/contrib/`
* Profiles (packages of type `drupal-profile`) will be placed in `web/profiles/contrib/`
* Creates default writable versions of `settings.php` and `services.yml`.
* Creates `web/sites/default/files`-directory.
* Latest version of drush is installed locally for use at `vendor/bin/drush`.
* Latest version of DrupalConsole is installed locally for use at `vendor/bin/drupal`.
* Creates environment variables based on your .env file. See [.env.example](.env.example).

## Updating Drupal Core

This project will attempt to keep all of your Drupal Core files up-to-date; the
project [drupal/core-composer-scaffold](https://github.com/drupal/core-composer-scaffold)
is used to ensure that your scaffold files are updated every time drupal/core is
updated. If you customize any of the "scaffolding" files (commonly .htaccess),
you may need to merge conflicts if any of your modified files are updated in a
new release of Drupal core.

Follow the steps below to update your core files.

1. Run `composer update drupal/core drupal/core-dev --with-dependencies` to update Drupal Core and its dependencies.
2. Run `git diff` to determine if any of the scaffolding files have changed.
   Review the files for any changes and restore any customizations to
  `.htaccess` or `robots.txt`.
1. Commit everything all together in a single commit, so `web` will remain in
   sync with the `core` when checking out branches or running `git bisect`.
1. In the event that there are non-trivial conflicts in step 2, you may wish
   to perform these steps on a branch, and use `git merge` to combine the
   updated core files with your customized files. This facilitates the use
   of a [three-way merge tool such as kdiff3](http://www.gitshah.com/2010/12/how-to-setup-kdiff-as-diff-tool-for-git.html). This setup is not necessary if your changes are simple;
   keeping all of your modifications at the beginning or end of the file is a
   good strategy to keep merges easy.

## FAQ

### Should I commit the contrib modules I download?

Composer recommends **no**. They provide [argumentation against but also
workrounds if a project decides to do it anyway](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md).

### Should I commit the scaffolding files?

The [Drupal Composer Scaffold](https://github.com/drupal/core-composer-scaffold) plugin can download the scaffold files (like
index.php, update.php, …) to the web/ directory of your project. If you have not customized those files you could choose
to not check them into your version control system (e.g. git). If that is the case for your project it might be
convenient to automatically run the drupal-scaffold plugin after every install or update of your project. You can
achieve that by registering `@composer drupal:scaffold` as post-install and post-update command in your composer.json:

```json
"scripts": {
    "post-install-cmd": [
        "@composer drupal:scaffold",
        "..."
    ],
    "post-update-cmd": [
        "@composer drupal:scaffold",
        "..."
    ]
},
```
### How can I apply patches to downloaded modules?

If you need to apply patches (depending on the project being modified, a pull
request is often a better solution), you can do so with the
[composer-patches](https://github.com/cweagans/composer-patches) plugin.

To add a patch to drupal module foobar insert the patches section in the extra
section of composer.json:
```json
"extra": {
    "patches": {
        "drupal/foobar": {
            "Patch description": "URL or local path to patch"
        }
    }
}
```
### How do I switch from packagist.drupal-composer.org to packages.drupal.org?

Follow the instructions in the [documentation on drupal.org](https://www.drupal.org/docs/develop/using-composer/using-packagesdrupalorg).

### How do I specify a PHP version ?

This project supports PHP 7.0 as minimum version (see [Drupal 8 PHP requirements](https://www.drupal.org/docs/8/system-requirements/drupal-8-php-requirements)), however it's possible that a `composer update` will upgrade some package that will then require PHP 7+.

To prevent this you can add this code to specify the PHP version you want to use in the `config` section of `composer.json`:
```json
"config": {
    "sort-packages": true,
    "platform": {
        "php": "7.0.33"
    }
},
```
