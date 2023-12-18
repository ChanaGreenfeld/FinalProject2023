import { Component, OnInit } from '@angular/core'
import { arrProduct, arrProduct3, product } from 'src/app/classes/product'
import { ProductsService } from 'src/app/services/products.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ShoppingListService } from 'src/app/services/shopping-list.service'
import { UsersService } from 'src/app/services/users.service'


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  
  filteredProducts: Array<any> = []

  products: Array<any> =[]
  pageNo: number = 1
  pageSize: number = 20
  totalItems: number = 0
  pageSizeForCategory: number = 12
  allOrCatBool: boolean = false
  category: string = ''
  categoryDescription:string

  constructor(
    private productServ: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListServ: ShoppingListService,
    private userServ: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      const category = params['category']
     
      this.pageNo = 1
      if (category == 'all') {
        this.category='כל המוצרים'
        this.allOrCatBool = true
        this.productServ.allOrCat = 'all',
        this.categoryDescription=""
        this.getProducts()
      } else {
        this.category=category
        this.allOrCatBool = false
        switch (category) {
          case 'כלי רכב רכבות וחניונים':
            this.categoryDescription="שנם צעצועים רבים ושונים של מכוניות, מסלולי מירוצים ומוסכים שמפתחים את הדימיון של ילדכם. הסוגים הנפוצים ביותר כוללים מכוניות המופעלות בצורה ידנית, מכוניות המופעלות באמצעות שלט רחוק וכאלה שבאמצעות סוללה  קטגוריית הצעצועים אליה משתייכים צעצועי מכוניות, רכבות, מסלולי מכוניות ומוסכים היא מוכרת ופופלארית מאוד וכוללת מוצרים שכל ילד היה שמח לקבל כמתנה."
            break;
            case 'אופניים קורקינטים וממונעים לילדים':
              this.categoryDescription="מחפשים את מתנת יום ההולדת המושלמת לילד שלכם או שמא החלטתם לחדש את האופניים לקראת יום כיפור, פסח או סוף שבוע שמשי? אצלנו תמצאו מגוון רחב של אופניים לילדים המתאימים לטווח רחב של גילאים. אנחנו מציעים מגוון מוצרי מתגלגלים החל מכאלה המתאימים לפעוטות כמו אופני איזון או אופניים עם גלגלי עזר, קורקינטים לילדים (גם עם שלוש גלגלים), רכבים ממונעים ועד אופניים לנוער ומבוגרים."
            break;
            case 'צעצועים וציוד תינוקות ופעוטות':
              this.categoryDescription="שמרו על החיוך שמקשט את פנים של התינוקות והפעוטות שלכם עם מגון צעצועים לתינוקות שיש אצלנו בטויס אר אס. אצלנו תמצאו צעצועים נמעכים, צעצועי בקיעת שיניים – נשכנים ורעשנים המפעילים את החושים. בנוסף לכך אנחנו חושפים לפניכם צעצועים לפעוטות שעוזרים לפתח את המיומנות המוטורית העדינה ותיאום עין – יד בכל שלבי ההתפתחות."
            break;
            case 'משחקי קוביות והרכבה':
              this.categoryDescription="אצלנו תמצאו מגוון ערכות בנייה והרכבה המתאימים לגילים שונים. בחרו את המשחק המתאים ביותר לילדכם ואפשרו להם לפתח את המוטריקה העדינה, ללמוד את חוקי הפיסיקה. באמצעות ערכות הרכבה ולבני קוביות שונים הילדים יכולים להפוך את הדימיון למוחשי תוך פיתוח והפגנת היצירתיות שלהם. בין המוצרים שלנו תמצאו דגמים שונים של קובניות עץ פבריקס, סברס, מארזי מגה בלוקס כל סדרות לגו ועוד."
            break;
            case 'על שלט':
              this.categoryDescription="כולנו יודעים שילדים אוהבים את מכוניות הצבעוני, חג בו כל אחד יכול להפוך חלום למציאות ולהפוך להיות גיבור על"
            break;
            case 'בובות בתי בובות ואביזרי משחק':
              this.categoryDescription="לפניכם מגוון בובות ואביזרי משחק שיעזרו לילדיכם לפתח את הדימיון וליהנות ממשחק תפקידים, חלקם אפילו יפתיעו אתכם עם הצגה משעשעת. אצלנו תמצאו בובות מותג כמו: בראץ, בובות דיסני כמו פרוזן ועוד. כמובן שאסור לכם לפספס את אזור בובות פרווה נעימות שכל ילד ישמח לישון איתה בלילה. "
            break;
            case 'משחקי חצר':
              this.categoryDescription="משחקי ספורט ומתקני חצר מוסיפים צבע ושעות הנאה לילדים, למשפחה ולחברים המתארחים בחצר הבית. משחקי חצר לילדים הם דרך מצוינת לנצל את השטח שלכם בבית ולגרום לילדים להתנתק מהמסכים ולעודד אותם לבצע פעילות גופנית. אצלנו מבחר גדול של מוצרים לחצר ומשחקי ספורט, מחפשים איך לשדרג את החצר? סננו לפי קטגוריה ותמצאו מוצרים כמו טרמפולינה לחצר, שער כדורגל, סל לכדורסל, בריכות כדורים לתינוקות, אוהל משחק ועוד מוצרים רבים."
            break;
            case 'משחקי קלפים':
              this.categoryDescription="צפו במגוון רחב של משחקי התפתחות ולמידה. בחרו את המשחק המתאים ביותר עבור ילדכם ואפשרו להם לפתח את המיומניות החברתיות לצד פיתוח החשיבה ויצירת אסטרטגיות משחק. מלבד משחקי חשיבה תמצאו סוגי פאזלים שונים המתאימים לכל הגילים החל מפאזל רצפה לפעוטות ועד לפאזלים מאתגרים של 3000 חלקים מעלה. בל נשכח את ספרי הקריאה לילדים וחוברות העובדה שמתאימות לזמן איכות מהנה ומלמד שלכם עם ילדכם.              "
            break;
            case 'קיץ':
              this.categoryDescription="הקיץ הזה אף אחד לא נשאר יבש! צפו במגוון מוצרי הקיץ שלנו והפתיעו את ילדכם. אצלנו תמצאו מגוון בריכות לילדים בין המוצרים בריכות מתנפחות, בריכות קשיחות וכאלה עם עמודים. אתם יכולים ליהנות גם ממגון דגמים של פארקי מים מתנפחים הכוללים מגלשה טרמפולינה ועוד. החלטתם לצאת לחופשה? אז אל תשכחו להתאבזר מבועד מועד עם גלשנים בוגים ואם יש לכם ילדים קטנים תמצאו אצלנו מבחר דגמים של גלגלי ים, מצופים משחקים לחוף ועוד  "
            break;
            case 'משחקי פאזלים':
              this.categoryDescription="צפו במגוון רחב של משחקי פאזל . בחרו את המשחק המתאים ביותר עבור ילדכם ואפשרו להם לפתח את המיומניות החברתיות לצד פיתוח החשיבה ויצירת אסטרטגיות משחק. מלבד משחקי חשיבה תמצאו סוגי פאזלים שונים המתאימים לכל הגילים החל מפאזל רצפה לפעוטות ועד לפאזלים מאתגרים של 3000 חלקים מעלה. בל נשכח את ספרי הקריאה לילדים וחוברות העובדה שמתאימות לזמן איכות מהנה ומלמד שלכם עם ילדכם."
            break;
            case 'משחקי קופסא וחברה':
              this.categoryDescription="צפו במגוון רחב של משחקי חברה ומשחקי התפתחות ולמידה. בחרו את המשחק המתאים ביותר עבור ילדכם ואפשרו להם לפתח את המיומניות החברתיות לצד פיתוח החשיבה ויצירת אסטרטגיות משחק. מלבד משחקי חשיבה תמצאו סוגי פאזלים שונים המתאימים לכל הגילים החל מפאזל רצפה לפעוטות ועד לפאזלים מאתגרים של 3000 חלקים מעלה. בל נשכח את ספרי הקריאה לילדים וחוברות העובדה שמתאימות לזמן איכות מהנה ומלמד שלכם עם ילדכם.   "
            break;
        }
        this.getProductsByCategory(category)
      }
    })
  }



  getProductsByCategory(event: any) {
    this.productServ.allOrCat = event
    this.getProductsPaginationByCategory()
  }


  addToshopping(product: arrProduct3) {
    if (this.userServ.currentUser) {
      const index = this.shoppingListServ.shoppingList.indexOf(product);
      if (index == -1) {
        product.item = 1
        this.shoppingListServ.shoppingList.push(product)
      }
      else {
        this.shoppingListServ.shoppingList[index].item = this.shoppingListServ.shoppingList[index].item + 1;
      }
      this.shoppingListServ.total += product.price
      alert("מוצר נוסף בהצלחה")
    }
    else {
      this.router.navigate(['login'])
    }
  }

  // ========================Pagination For All Products=================================
  getProducts() {
    this.productServ
      .getProductsPagination(this.pageNo)
      .subscribe((data: any) => {
        this.products = data.products
        this.totalItems = data.total
        this.totalItems = data.totalItems
      })
  }

  setPageNo(pageNo: number) {
    this.pageNo = pageNo
    this.getProducts()
  }

  getPages() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize)
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.pageSize)
  }
  scrollToTop() {
    window.scrollTo(0, 0)
  }
  // ==========================================================

  // ==================pagination For Products By Category==============================

  getProductsPaginationByCategory() {

    this.productServ
      .getProductsPaginationByCategory(this.pageNo, this.productServ.allOrCat)
      .subscribe((data) => {
        this.products = data
        this.totalItems = data.totalItems
      })
  }
  setPageNoCat(pageNo: number) {
    this.pageNo = pageNo
    this.getProductsPaginationByCategory()
  }

  // ====================================================================================
  productDetails(id: string) {
    this.router.navigate(['productDetails'], { queryParams: { id: id } })
  }


}
