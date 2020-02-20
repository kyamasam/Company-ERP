<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(UsersTableSeeder::class);
         $this->call(CategoriesTableSeeder::class);
         $this->call(Employee_projectsTableSeeder::class);
         $this->call(PaymentsTableSeeder::class);
         $this->call(Product_categoriesTableSeeder::class);
         $this->call(ProductsTableSeeder::class);
         $this->call(ProficienciesTableSeeder::class);
         $this->call(Project_customersTableSeeder::class);
         $this->call(ProjectsTableSeeder::class);
         $this->call(Quotation_productsTableSeeder::class);
         $this->call(Quotations_paymentsTableSeeder::class);
         $this->call(QuotationsTableSeeder::class);
         $this->call(User_proficienciesTableSeeder::class);
         $this->call(User_typesTableSeeder::class);
         $this->call(TicketPrioritiesTableSeeder::class);
         $this->call(TicketCategoriesTableSeeder::class);
         $this->call(TicketsTableSeeder::class);
         $this->call(SubscriptionTableSeeder::class);
    }
}
