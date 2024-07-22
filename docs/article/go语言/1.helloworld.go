package main

import (
	"fmt"
	"unsafe"
)

func main() {

	var a, b = int(5), uint(6)
	var p uintptr = 0x12345678
	fmt.Println("signed integer a's length is", unsafe.Sizeof(a))   // 8
	fmt.Println("unsigned integer b's length is", unsafe.Sizeof(b)) // 8
	fmt.Println("uintptr's length is", unsafe.Sizeof(p))            // 8

	fmt.Println("hello world")
}

var a, b, c = 1, 'A', 'B'
