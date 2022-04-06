<?php
// phipias.co
// http://candidatos.phidias.co/default/sql?uid=1%20or%20rol=%27admin%27&nombre=jimmy
class Encrypter
{
  // private $alphabet_source = 'abcdefghijklmnopqrstuvwxyz ';
  // private $alphabet_target = 'qrstuvwxyzabcdefghijklmnop ';
  private $alphabet_target = 'abcdefghijklmnopqrstuvwxyz ';
  private $alphabet_source = 'qrstuvwxyzabcdefghijklmnop ';

  public function translate($string)
  {
    return strtr($string, $this->alphabet_source, $this->alphabet_target);
  }
}

class myEncrypter extends Encrypter
{
  private $alphabet_source = 'abcdefghijklmnopqrstuvwxyz ';
  private $alphabet_target = '1234567890abcdefghijklmnop ';
}

$encrypter  = new myEncrypter;
$input      = 'candidatospuntophidiaspuntocoslashentrevista';
$input = 'sqdtytqjeifkdjefxytyqifkdjeseibqixudjhulyijq';
echo $encrypter->translate($input);

// if ( $encrypter->translate($input) == 'sqdtytqjeifkdjefxytyqifkdjeseibqixudjhulyijq' ) {
//     // advance_level();
//     echo 'bien';
// } else {
//     // throw new Exception('Sorry! Wrong string');
//     echo 'Sorry';
// }
