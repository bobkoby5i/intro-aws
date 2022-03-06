<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'acloudguru' );

/** Database username */
define( 'DB_USER', 'admin' );

/** Database password */
define( 'DB_PASSWORD', 'Xdeq2001' );

/** Database hostname */
define( 'DB_HOST', 'koby5i.coh10de3xnud.us-east-1.rds.amazonaws.com' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'GV M&u{y#avcn0@]*LkH<(x*KeR6/;VfJJ_0$cAIN[Ojnug~~|tgDT87^P@Mu{E9' );
define( 'SECURE_AUTH_KEY',  '/F#6K67D%`2%+,Wh_^>/J0*g8ycy__XVVHL|$P?6>@l!%;/ovEysrW!FYO|kxKu_' );
define( 'LOGGED_IN_KEY',    'fqwH;RLa*oAM``s1!)$2oS6x<d=zs}e8guk(b}_TF4]@==~ _7_@dviUXFj`([Qy' );
define( 'NONCE_KEY',        '`CInCMrxL`J _797^pP)4Vw^d^hl-DD+gfb^M,x]S(e~m`]/#q1.[e)#!c|J}#6D' );
define( 'AUTH_SALT',        ']/d=g3h@VB9*s0O.5 ,7`3g2qX#x^wUq:Z6i}Q1WzDx?<yw-;e~~II?2ZH71HX6w' );
define( 'SECURE_AUTH_SALT', '_R?!vZZ{8uq[C2ZDDp:6R>Wh}foBhG 1!7AcaDF:eO[8?C1;kn[;$Wg&&43[P)o/' );
define( 'LOGGED_IN_SALT',   'L-s*yIkJw-VVuYfkpR d)a! ]ICQoCwb=L@:e5sV!GWaF>:10.I:^b9PW^Cd6DIj' );
define( 'NONCE_SALT',       'hS?@$CxPNBMjNY)uJ N>X2ZU-j8((n{<k~H0IGo3+!_`_efOE34VQm7vVgIrKgM ' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
